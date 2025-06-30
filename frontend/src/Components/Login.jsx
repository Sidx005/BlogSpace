import { Box, Button, Card, Flex, Text, TextField } from '@radix-ui/themes/dist/cjs/index.js'
import React, { useEffect, useState } from 'react'
import  { axiosLocal } from '../utils/Axios'
import { useAuth } from '../Context'
import { Link } from 'react-router-dom'

const Login = () => {
    const {setUser,setToken,user,navigate,loading,setLoading}=useAuth()
    
    const [formData,setFormData]=useState({
        email:'',
        password:''
    })
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData(prev=>({...prev,[name]:value}))
    }
    const handleSubmit=async(e)=>{
        setLoading(true)
        e.preventDefault();
        console.log(formData);
        const {email,password}=formData
        if( !email || !password){
            return alert('Please provide all fields')
        }
        if(password.length<6){
            return alert('Password must be at least 6 characters')
        }
        try{
            
            const res=await axiosLocal.post('/auth/login',formData)
            const {token,user}=res.data
            // setUser(res.data.user)
            
            localStorage.setItem('token',token)
            setToken(token)
            
            console.log(res.data);

            setUser(user)
            console.log(user);
            navigate('/blogs')

        }catch(err){
            console.log(err);
            setUser(null)
        }finally{
            setLoading(false)
        }
    }

  return (
    <Flex align={'center'} minHeight={'100vh'} justify={'center'}>
<Box maxWidth="240px" >
	<Card size="5" >
    <Flex direction={'column'} gap={'2'} align={'start'} justify={'center'}>
    <form method='post' onSubmit={handleSubmit}>

		<Text>Login</Text>
        <Flex direction={'column'} gap={'3'} align={'start'} justify={'center'}>

        <TextField.Root name='email' value={formData.email} onChange={handleChange}  placeholder="Email" size="3" type="email" required/>
        <TextField.Root name='password' value={formData.password} onChange={handleChange}  placeholder="Password" size="3" type="password" required/>
        <Button size="3" variant="classic" type="submit">Login</Button>
        <Link to={'/register'}> Dont Have an account </Link>
		</Flex>
        </form>
		</Flex>
	</Card>
</Box>
</Flex>
  )
}

export default Login