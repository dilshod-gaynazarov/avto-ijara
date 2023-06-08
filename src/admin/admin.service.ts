import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { MailService } from 'src/mail/mail.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import * as bcrypt from 'bcryptjs';

interface Token {
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepository: typeof Admin,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) { }

  async registerAdmin(registerAdminDto: RegisterAdminDto, res: Response) {
    const exist_email = await this.adminRepository.findOne({
      where: { email: registerAdminDto.email }
    });
    if (exist_email) {
      throw new BadRequestException("Email already registered!");
    };
    const exist_phone = await this.adminRepository.findOne({
      where: { phone_number: registerAdminDto.phone_number }
    });
    if (exist_phone) {
      throw new BadRequestException("Phone number already registered!");
    };
    const hashed_password = await bcrypt.hash(registerAdminDto.password, 7);
    const admin = await this.adminRepository.create({
      ...registerAdminDto, hashed_password, is_admin: true, is_active: true
    });
    const tokens = await this.generateTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)
    const updated_admin = await this.adminRepository.update(
      { hashed_refresh_token }, { where: { id: admin.id }, returning: true }
    );
    await this.mailService.sendOtpToEmail(updated_admin[1][0]);
    await this.forResponseAdmin(tokens, updated_admin[1][0], res, 'Admin registrated successfully');
    const updated = updated_admin[1][0];
    return { tokens, updated };
  }


  async loginAdmin(loginAdminDto: LoginAdminDto, res: Response) {
    const { email, password } = loginAdminDto;
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) {
      throw new BadRequestException('User not registered!');
    };
    const isMatchPass = await bcrypt.compare(password, admin.hashed_password);
    if (!isMatchPass) {
      throw new BadRequestException('Wrong password!');
    };
    const tokens = await this.generateTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updated_admin = await this.adminRepository.update(
      { hashed_refresh_token, is_active: true }, { where: { id: admin.id }, returning: true }
    );
    await this.forResponseAdmin(tokens, updated_admin[1][0], res, 'Admin logged in successfully');
    const updated = updated_admin[1][0];
    return { tokens, updated };
  }


  async logoutAdmin(refreshToken: string, res: Response) {
    const data = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!data) {
      throw new ForbiddenException('Admin not found!');
    };
    const updated_admin = await this.adminRepository.update(
      { hashed_refresh_token: null, is_active: false }, { where: { id: data.id }, returning: true }
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'Admin logged out successfully',
      user: updated_admin[1][0],
    };
    return response;
  }


  async refreshTokenAdmin(admin_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (admin_id != decodedToken['id']) {
      throw new BadRequestException('Admin not found!');
    };
    const admin = await this.adminRepository.findOne({ where: { id: admin_id } });
    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException('User not found!');
    };
    const tokenMatch = await bcrypt.compare(refreshToken, admin.hashed_refresh_token);
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden!');
    };
    const tokens = await this.generateTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updated_admin = await this.adminRepository.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: admin.id }, returning: true }
    );
    await this.forResponseAdmin(tokens, updated_admin[1][0], res, 'Token updated successfully');
    const updated = updated_admin[1][0];
    return { tokens, updated };
  }

  async findAll(): Promise<Admin[]> {
    const admins = await this.adminRepository.findAll();
    return admins;
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findByPk(id);
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const hashed_password = await bcrypt.hash(updateAdminDto.password, 7);
    const update_admin = await this.adminRepository.update(
      { ...updateAdminDto, hashed_password }, { where: { id }, returning: true });
    return update_admin[1][0];
  }

  async remove(id: number): Promise<Object> {
    const admin = await this.adminRepository.findByPk(id);
    await this.adminRepository.destroy({ where: { id } });
    return { message: "Admin removed", admin };
  }


  private async generateTokens(admin: Admin) {
    const jwtPayload = { id: admin.id, is_active: admin.is_active, is_admin: admin.is_admin };
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


  async forResponseAdmin(token: Token, admin: Admin, res: Response, message: string) {
    res.cookie('refresh_token', token.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });
    const response = {
      message: `${message}`,
      admin,
      token
    };
    return response;
  }
}
