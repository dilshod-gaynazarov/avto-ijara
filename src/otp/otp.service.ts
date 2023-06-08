import { BadRequestException, Injectable } from '@nestjs/common';
import { EmailCustomerDto } from './dto/email-customer.dto';
import * as otpGenerator from 'otp-generator';
import { InjectModel } from '@nestjs/sequelize';
import { Otp } from './models/otp.model';
import { AddMinutesToDate } from 'src/helpers/addMinutes';
import { Op } from 'sequelize';
import { dates, decode, encode } from 'src/helpers/crypto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { Customer } from 'src/customer/models/customer.model';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp) private otpRepository: typeof Otp,
    @InjectModel(Customer) private customerRepository: typeof Customer,
  ) { }

  async newOtp(emailCustomerDto: EmailCustomerDto) {
    const email = emailCustomerDto.email;
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false
    });
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpRepository.destroy({ where: { [Op.and]: [{ check: email }, { verified: false }] } });
    const new_otp = await this.otpRepository.create({ otp, expiration_time, check: email });
    const details = {
      timestamp: now, check: email, success: true, message: "OTP send to customer", otp_id: new_otp.id
    };
    const encoded = await encode(JSON.stringify(details));
    return { status: 'Successfully OTP', Details: encoded };
  }


  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { verification_key, otp, check } = verifyOtpDto;
    const currentdate = new Date();
    const decoded = await decode(verification_key);
    const obj = JSON.parse(decoded);
    const check_obj = obj.check;
    if (check_obj != check) {
      throw new BadRequestException('OTP bu emailga yuborilmagan!');
    };
    const result = await this.otpRepository.findOne({ where: { id: obj.otp_id } });
    if (result != null) {
      if (!result.verified) {
        if (dates.compare(result.expiration_time, currentdate)) {
          if (otp === result.otp) {
            const customer = await this.customerRepository.findOne({
              where: { email: check },
            });
            if (customer) {
              const updated_customer = await this.customerRepository.update(
                { is_owner: true },
                { where: { id: customer.id }, returning: true },
              );
              await this.otpRepository.update(
                { verified: true }, { where: { id: obj.otp_id }, returning: true }
              )
              const response = {
                message: 'Customer updated as owner',
                customer: updated_customer[1][0],
              };
              return response;
            }
          } else {
            throw new BadRequestException('Otp is not match!');
          }
        } else {
          throw new BadRequestException('Otp expired!');
        }
      } else {
        throw new BadRequestException('Otp already used!');
      }
    } else {
      throw new BadRequestException('Customer not found!');
    }
  }


  async findAll(): Promise<Otp[]> {
    const otps = await this.otpRepository.findAll();
    return otps;
  }

  async findOne(id: number): Promise<Otp> {
    const otp = await this.otpRepository.findOne({ where: { id } });
    return otp;
  }

  async remove(id: number): Promise<Object> {
    const otp = await this.otpRepository.findByPk(id);
    await this.otpRepository.destroy({ where: { id } });
    return { message: "Remoed otp", otp };
  }
}
