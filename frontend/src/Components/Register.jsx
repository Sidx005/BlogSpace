import { Box, Button, Card, Flex, Text, TextField } from '@radix-ui/themes/dist/cjs/index.js'
import React, { useEffect, useState } from 'react'
import  { axiosLocal } from '../utils/Axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context'

const Login = () => {
    const {user,token,navigate}=useAuth()
    const [formData,setFormData]=useState({
        fullName:'',
        email:'',
        password:''
    })
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData(prev=>({...prev,[name]:value}))
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(formData);
        const {fullName,email,password}=formData
        if(!fullName || !email || !password){
            return alert('Please provide all fields')
        }
        if(password.length<6){
            return alert('Password must be at least 6 characters')
        }
        try{
            const res=await axiosLocal.post('/auth/signup',formData)
            if(res.data.success ) navigate('/login')
            console.log(res.data);
        }catch(err){
            console.log(err);
            
        }
    }
    useEffect(()=>{
        if(user||token){
          navigate('/login')
        }
    },[user,navigate])
  return (
    <Flex align={'center'} minHeight={'100vh'} justify={'center'}>
<Box maxWidth="240px" >
	<Card size="5" >
    <Flex direction={'column'} gap={'2'} align={'start'} justify={'center'}>

		<Text>Register</Text>
        <form method='post' onSubmit={handleSubmit}>
        <Flex direction={'column'} gap={'3'} align={'start'} justify={'center'}>

        <TextField.Root name='fullName' value={formData.fullName} onChange={handleChange}  placeholder="Username" size="3" type="text" required/>
        <TextField.Root name='email' value={formData.email}    onChange={handleChange}  placeholder="Email" size="3" type="email" required/>
        <TextField.Root name='password' value={formData.password} onChange={handleChange}  placeholder="Password" size="3" type="password" required/>
        <Button size="3"  variant='classic' type="submit">Register</Button>
		<Link to={'/login'}>Already have an account?</Link>
        </Flex>
        </form>
		</Flex>
	</Card>
</Box>
</Flex>
  )
}

export default Login