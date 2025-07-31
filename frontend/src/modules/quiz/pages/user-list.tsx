// UserList.tsx
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';

interface Question {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

interface User {
  _id: string;
  title: string;
  questions: Question[];
}



const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://localhost:7777/api/v1/quiz/quiz')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Users:', data);
        setUsers(data);
      })
      .catch(err => console.error('API Error:', err));
  }, []);

return (
  <div>
    {/* <h2 className="text-2xl font-bold mb-4">Quiz List</h2> */}
    {users.map(user => (
      <div  key={user._id}>
        {/* <h3>{user.title}</h3> */}
        {/* <ul>
          {user.questions.map((q, index) => (
            <li key={index}>
              <strong>Q{index + 1}: {q.question}</strong>
              <ul>
                <li>Option 1: {q.option1}</li>
                <li>Option 2: {q.option2}</li>
                <li>Option 3: {q.option3}</li>
                <li>Option 4: {q.option4}</li>
              </ul>
            </li>
          ))}
        </ul> */}
        {/* <Card className="bg-white text-black shadow-xl rounded-2xl">
  <CardHeader>
    <CardTitle>{user.title}</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <Button>Start this quiz</Button>
  </CardContent> */}

<Card className="bg-gray-50 text-black shadow-md rounded-xl hover:shadow-lg transition">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{user.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">Test your knowledge with friends or solo</p>
                <Button 
                //   onClick={() => navigate("/join-quiz")} 
                  className="bg-black hover:bg-gray-800 text-white w-full py-2 rounded-md"
                >
                  Join
                </Button>
              </CardContent>
            </Card>

  {/* <CardFooter>
    <p>Card Footer</p>
  </CardFooter> */}
{/* </Card> */}
<br />
      </div>
    ))}
  </div>
);
}


export default UserList;