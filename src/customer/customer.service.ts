import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { LoginCustomerDto } from './dto/login-customer.dto';

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer) private customerRepository: typeof Customer,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) { }

  async register(registerCustomerDto: RegisterCustomerDto, res: Response) {
    const exist_email = await this.customerRepository.findOne({
      where: { email: registerCustomerDto.email }
    });
    if (exist_email) {
      throw new BadRequestException("Email already registered!");
    };
    const exist_phone = await this.customerRepository.findOne({
      where: { phone_number: registerCustomerDto.phone_number }
    });
    if (exist_phone) {
      throw new BadRequestException("Phone number already registered!");
    };
    const hashed_password = await bcrypt.hash(registerCustomerDto.password, 7);
    const customer = await this.customerRepository.create({
      ...registerCustomerDto, hashed_password
    });
    const tokens = await this.generateToken(customer);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)
    const updateUser = await this.customerRepository.update(
      { hashed_refresh_token, is_active: true }, { where: { id: customer.id }, returning: true }
    );
    await this.mailService.sendOtpToEmail(updateUser[1][0]);
    return this.forResponse(tokens, updateUser[1][0], res, 'User registrated successfully');
  }


  async login(loginCustomerDto: LoginCustomerDto, res: Response) {
    const { email, password } = loginCustomerDto;
    const customer = await this.customerRepository.findOne({ where: { email } });
    if (!customer) {
      throw new BadRequestException('User not registered!');
    };
    const isMatchPass = await bcrypt.compare(password, customer.hashed_password);
    if (!isMatchPass) {
      throw new BadRequestException('Wrong password!');
    };
    const tokens = await this.generateToken(customer);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updated_customer = await this.customerRepository.update(
      { hashed_refresh_token, is_active: true }, { where: { id: customer.id }, returning: true }
    );
    return this.forResponse(tokens, updated_customer[1][0], res, 'User logged in successfully');
  }


  async logout(refreshToken: string, res: Response) {
    const data = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!data) {
      throw new ForbiddenException('User not found!');
    };
    const updated_customer = await this.customerRepository.update(
      { hashed_refresh_token: null, is_active: false }, { where: { id: data.id }, returning: true }
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'User logged out successfully',
      user: updated_customer[1][0],
    };
    return response;
  }


  async refreshToken(customer_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (customer_id != decodedToken['id']) {
      throw new BadRequestException('User not found!');
    };
    const customer = await this.customerRepository.findOne({ where: { id: customer_id } });
    if (!customer || !customer.hashed_refresh_token) {
      throw new BadRequestException('User not found!');
    };
    const tokenMatch = await bcrypt.compare(refreshToken, customer.hashed_refresh_token);
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden!');
    };
    const tokens = await this.generateToken(customer);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedUser = await this.customerRepository.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: customer.id }, returning: true }
    );
    return this.forResponse(tokens, updatedUser[1][0], res, 'Token updated successfully');
  }


  async findAll(): Promise<Customer[]> {
    const customers = await this.customerRepository.findAll();
    return customers;
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.customerRepository.update(updateCustomerDto, { where: { id }, returning: true });
    return customer[1][0];
  }

  async remove(id: number): Promise<Object> {
    const customer = await this.customerRepository.findByPk(id);
    await this.customerRepository.destroy({ where: { id } });
    return { message: "Removed customer", customer };
  }


  private async generateToken(customer: Customer) {
    const jwtPayload = { id: customer.id, is_active: customer.is_active, full_name: customer.full_name };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }


  async forResponse(tokens: Tokens, customer: Customer, res: Response, message: string) {
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });
    const response = {
      message: `${message}`,
      customer,
      tokens
    };
    return response;
  }


}
