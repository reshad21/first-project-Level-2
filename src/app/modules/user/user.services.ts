import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
    // crate a user
    // const user: NewUser = {}
    const userData: Partial<TUser> = {}

    if (!password) {
        userData.password = config.default_password as string;
    } else {
        userData.password = password;
    }

    //set student role
    userData.role = 'student';
    //set manually generated id
    userData.id = '2030100001'

    //CREATE A USER
    const newUser = await User.create(userData);

    //create a student
    if (Object.keys(newUser).length) {
        //set id, _id as user
        studentData.id = newUser.id;
        studentData.user = newUser._id;

        const newStudent = await Student.create(studentData);
        return newStudent;
    }
    // return newUser;
};

export const UserServices = {
    createStudentIntoDB
}