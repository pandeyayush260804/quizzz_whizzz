// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@radix-ui/react-label";
// import {zodResolver} from '@hookform/resolvers/zod';
// import {useForm} from 'react-hook-form';
// import { useNavigate } from "react-router-dom";
// // import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


// // import { useState } from "react";
// import { questionSchema } from "@/modules/user/validations/question-validation";
// import { doRegister } from "@/modules/user/api/user-api";
// // import { registerSchema } from "../user/validations/register-validation.tsx";
// // import { doRegister } from "../user/api/user-api";


// // function clearAllFields(){
// //     const FIELDS = ['question', 'option1', 'option2', 'option3', 'option4'];
// //     let field:string;
// //     for (field of FIELDS){
// //         const element = document.getElementById(field) as HTMLInputElement | null;
// //         if (element) {
// //             element.value = '';
// //         }
// //     }
// // }

// // const [question, setQuestion] = useState('');
// // const [option1, setOption1] = useState('');
// // const [option2, setOption2] = useState('');
// // const [option3, setOption3] = useState('');
// // const [option4, setOption4] = useState('');

// // function clearAllFields() {
// //     setQuestion('');
// //     setOption1('');
// //     setOption2('');
// //     setOption3('');
// //     setOption4('');
// //     // console.log()
// // }

// const AddQuestion=()=>{
//     const navigate=useNavigate();
//     const {register, handleSubmit,formState:{errors}}=useForm({
//         resolver:zodResolver(questionSchema),
//         defaultValues:{
//             question:'',
//             option1:'',
//             option2:'',
//             option3:'',
//             option4:''
//         }
//     });
//     const registerSubmit=async (userData:any)=>{
//         console.log("Form Submitted",userData)
//         try{
//         const result=await doRegister(userData);
//         if(result.data.id){
//             navigate('/login')
//         }
//         console.log('Result:',result)
        
//         }
//         catch(err){
//             console.log('Register faill',err)
//         }
//     }
//     return(<Card className="w-full max-w-md mx-auto">
//         <CardHeader>
//             <CardTitle className="space-y-1 text-center">
//                 Add Question here....
//             </CardTitle>
//             {/* <CardDescription className="text-center">Registration For Quiz</CardDescription> */}
//         </CardHeader>
        
//         <CardContent>
//             <form onSubmit={handleSubmit(registerSubmit)}>
//                 <div className="grid w-full max-w-sm items-center gap-3">
//                 <Label htmlFor="Name">Enter Question :</Label>
//                 <Input {...register('question')} type="Name" id="question" placeholder="Enter your question..." />
//                 <span className="text-red-500">{errors.question && errors.question.message}</span>
//                 </div>

//                 <br />

//                 <div>
//                     <label htmlFor="">Enter options :</label>
//                 </div>
                
//                 <div className="grid w-full max-w-sm items-center gap-3 mt-[10px]">
//                     {/* <Label htmlFor="Name">Option 1</Label> */}
//                     <Input {...register('option1')} type="Name" id="option1" placeholder="Enter Option 1..." />
//                     <span className="text-red-500">{errors.option1 && errors.option1.message}</span>
//                 </div>

//                 <div className="grid w-full max-w-sm items-center gap-3">
//                     {/* <Label htmlFor="Name">Option 2</Label> */}
//                     <Input {...register('option2')} type="Name" id="option2" placeholder="Enter Option 2..." />
//                     <span className="text-red-500">{errors.option2 && errors.option2.message}</span>
//                 </div>

//                 <div className="grid w-full max-w-sm items-center gap-3">
//                     {/* <Label htmlFor="Name">Option 3</Label> */}
//                     <Input {...register('option3')} type="Name" id="option3" placeholder="Enter Option 3..." />
//                     <span className="text-red-500">{errors.option3 && errors.option3.message}</span>
//                 </div>

//                 <div className="grid w-full max-w-sm items-center gap-3">
//                     {/* <Label htmlFor="Name">Option 4</Label> */}
//                     <Input {...register('option4')} type="Name" id="option4" placeholder="Enter Option 4..." />
//                     <span className="text-red-500">{errors.option4 && errors.option4.message}</span>
//                 </div>

//                 <br />
                
//                 <div className="flex place-content-between">
//                     <div className="grid w-[40%] max-w-sm items-center gap-3">
//                         <Button onClick={AddQuestion}>Add Question</Button>
//                     </div>
//                     <div className="grid w-[30%] max-w-sm items-center gap-3">
//                         <Button>Add Quiz</Button>
//                     </div>
//                 </div>
                
//             </form>
//         </CardContent>

//     </Card>);

// }
// export default AddQuestion;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';


import {  useState } from "react";
import { questionSchema } from "@/modules/user/validations/question-validation";
import { useQuizStore } from "@/modules/store/quiz-store";





const AddQuestion=()=>{
    const title = useQuizStore((state) => state.title); 
    // const navigate=useNavigate();
    type Question = {
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
};

const [quiz, setQuiz] = useState<string[][]>([]);

const addQuiz = async () => {
  console.log("Final quiz title:", title);
  console.log("Final questions array:", quiz);

  try {
    const res = await fetch("https://quizzz-whizzz.vercel.app/api/v1/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        questions: quiz.map(([question, option1, option2, option3, option4]) => ({
          question,
          option1,
          option2,
          option3,
          option4,
        })),
      }),
    });

    if (!res.ok) throw new Error("Failed to submit quiz");

    const result = await res.json();
    console.log("✅ Quiz saved:", result);

    // Optionally reset quiz state or show success message
    setQuiz([]);
  } catch (err) {
    console.error("❌ Error saving quiz:", err);
  }
};

const registerSubmit=async (userData:unknown)=>{
        console.log("Form Submitted",userData)
        // try{
        // const result=await doRegister(userData);
        // if(result.data.id){
        //     navigate('/login')
        // }
        // console.log('Result:',userData)
        // setQuiz(prevQuiz => [...quiz, userData]);
        
        // }
        // catch(err){
        //     console.log('Register faill',err)
        // }
        // const data = userData as Question;
        const data = userData as Question;
        const quizData = [
            data.question,
            data.option1, 
            data.option2, 
            data.option3,
            data.option4
        ];
        

        setQuiz(prev => [...prev, quizData]);
        console.log("Quiz : ",quiz);
        }

    const {register, handleSubmit,formState:{errors}}=useForm({
        resolver:zodResolver(questionSchema),
        defaultValues:{
            question:'',
            option1:'',
            option2:'',
            option3:'',
            option4:''
        }
    });
    
    return(<Card className="w-full max-w-md mx-auto">
        <CardHeader>
            <CardTitle className="space-y-1 text-center">
                Add Question here....
            </CardTitle>
            {/* <CardDescription className="text-center">Registration For Quiz</CardDescription> */}
        </CardHeader>
        
        <CardContent>
            <form >
                <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="Name">Enter Question :</Label>
                <Input {...register('question')} type="Name" id="question" placeholder="Enter your question..." />
                <span className="text-red-500">{errors.question && errors.question.message}</span>
                </div>

                <br />

                <div>
                    <label htmlFor="">Enter options :</label>
                </div>
                
                <div className="grid w-full max-w-sm items-center gap-3 mt-[10px]">
                    {/* <Label htmlFor="Name">Option 1</Label> */}
                    <Input {...register('option1')} type="Name" id="option1" placeholder="Enter Option 1..." />
                    <span className="text-red-500">{errors.option1 && errors.option1.message}</span>
                </div>
                

                <div className="grid w-full max-w-sm items-center gap-3">
                    {/* <Label htmlFor="Name">Option 2</Label> */}
                    <Input {...register('option2')} type="Name" id="option2" placeholder="Enter Option 2..." />
                    <span className="text-red-500">{errors.option2 && errors.option2.message}</span>
                </div>

                <div className="grid w-full max-w-sm items-center gap-3">
                    {/* <Label htmlFor="Name">Option 3</Label> */}
                    <Input {...register('option3')} type="Name" id="option3" placeholder="Enter Option 3..." />
                    <span className="text-red-500">{errors.option3 && errors.option3.message}</span>
                </div>

                <div className="grid w-full max-w-sm items-center gap-3">
                    {/* <Label htmlFor="Name">Option 4</Label> */}
                    <Input {...register('option4')} type="Name" id="option4" placeholder="Enter Option 4..." />
                    <span className="text-red-500">{errors.option4 && errors.option4.message}</span>
                </div>

                <br />
                
                
                <div className="flex place-content-between">
                    <div className="grid w-[40%] max-w-sm items-center gap-3">
                        <Button onClick={handleSubmit(registerSubmit)}>Add Question</Button>
                    </div>
                    <div className="grid w-[30%] max-w-sm items-center gap-3">
                        <Button onClick={addQuiz}>Add Quiz</Button>
                    </div>
                </div>
                
            </form>
        </CardContent>

    </Card>);

}
export default AddQuestion;