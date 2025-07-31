import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { registerSchema } from "../validations/register-validation.js";
import { doRegister } from "../api/user-api";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {Angry} from 'lucide-react';
import { useState } from "react";
const Register = ()=>{
    const [status, setStatus] =useState(false);
    const [message, setMessage]  = useState('');
    const navigate = useNavigate();
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues:{
            email : '',
            password: '',
            name:''
        }
    });
    const alertJSX = <div>
                <Alert variant="destructive">
                    <Angry />
                    <AlertTitle>Register Message</AlertTitle>
                    <AlertDescription>
                    {message}
                    </AlertDescription>
                    </Alert>
            </div>;
    const registerSubmit = async (userData:any)=>{
        console.log('Form Submit ', userData);
        try{
        const result= await doRegister(userData);
         console.log('Result ', result);
        if(result.data.message){
            setStatus(false);
             navigate('/login');
        }
        else{
            setStatus(true);
            setMessage('Unable to register...');
            console.log('Unable to register...');
        }
       
       
        }
        catch(err:any){
             setStatus(true);
             setMessage(err.response.data.message);
            console.log('Register Fail ', err);
        }
    }
    return (<Card className="w-full max-w-md mx-auto">
        <CardHeader>
            <CardTitle className="space-y-1 text-center">Register Here</CardTitle>
            <CardDescription className="text-center">Music App Form</CardDescription>
        </CardHeader>
        
        <CardContent>
           {status && alertJSX} 
           <form onSubmit={handleSubmit(registerSubmit)}>
        <div className="grid w-full max-w-sm items-center gap-3">
             <Label htmlFor="email">Email</Label>
             <Input {...register('email')}  type="email" id="email" placeholder="Email" />
            <span className="text-red-500">{errors.email && errors.email.message}</span>
    </div>
     <div className="grid w-full max-w-sm items-center gap-3">
             <Label htmlFor="password">Password</Label>
             <Input  {...register('password')} type="password" id="password" placeholder="Password" />
             <span className="text-red-500">{errors.password && errors.password.message}</span>
    </div>
     <div className="grid w-full max-w-sm items-center gap-3">
             <Label htmlFor="name">Name</Label>
             <Input  {...register('name')} type="text" id="name" placeholder="name" />
         <span className="text-red-500">{errors.name && errors.name.message}</span>
    </div>
    <br />
    <div className="grid w-full max-w-sm items-center gap-3">
            <Button>Register</Button>
    </div>

           </form>
        </CardContent>
        
    </Card>);
}
export default Register;