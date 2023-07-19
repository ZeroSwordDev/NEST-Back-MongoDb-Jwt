import { Body, Controller, Post,Get , Param} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('api/v1/user')
export class UserController {
constructor(private readonly userService: UserService){}

    @Post()
    create(@Body() UserDTO : UserDTO) {
        return this.userService.create(UserDTO)
    }

    @Get()
    Getalluser(){
        return this.userService.getalluser();
    }
    GetoneUser(@Param('id') id : string){
        return this.userService.getOneUser(id);
    }

}
