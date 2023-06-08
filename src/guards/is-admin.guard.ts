import { JwtService } from '@nestjs/jwt';
import { Injectable, ExecutionContext, CanActivate, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs';

@Injectable()
export class IsAdminGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException({
                message: "Token not found!"
            });
        }
        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException({
                message: "Token not found!"
            });
        }
        let admin: any;
        try {
            admin = this.jwtService.verify(token, {
                secret: process.env.ACCESS_TOKEN_KEY
            })
        } catch (error) {
            throw new UnauthorizedException({ message: "Token expired!" });
        }
        try {
            if (!admin.is_admin) {
                throw new UnauthorizedException('Admin is not authorized!');
            }
            if (!admin.is_active) {
                throw new UnauthorizedException('Admin is not authorized!')
            }
            req.admin = admin;
        } catch (error) {
            throw new UnauthorizedException({
                message: "Admin is not authorized!"
            });
        }
        return true;
    }
}