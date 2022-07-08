import { Button, Divider, Typography } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Text } from './_app'


const Home: NextPage = () => {
  const {push} = useRouter()
  return (
    <HomeContainer className="flex flex-col bg-[#e4faee]  w-screen h-full min-h-screen items-center justify-start">
      <div className="flex flex-col p-[10px_30px] items-center justify-start w-full bg-[#0d5fc5] md:h-[100vh] ">
        <div className="flex flex-row w-full items-center justify-between p-[20px_0px] ">
          <div className="flex flex-row w-1/2 items-center justify-start">
            <Image height={48} width={40} src="/icons/logo.svg" />
            <Text className="ml-3 !text-black text-2xl font-bold " style={{fontFamily: "Roboto, sans-serif"}} >
              ladybug.
            </Text>
          </div>
          <div className="flex w-1/2 flex-row items-center justify-end">
            <Button onClick={()=>{
              push("/auth")
            }} className="mr-5" >
              Login
            </Button>
            <Button onClick={()=>{
              push("/auth")
            }} className="mr-5" >
              Sign Up
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full">
            <Image height={400} width={450} src="/illustrations/fixing_bug.svg" />
            <Text className=" md:mt-5 text-3xl text-center font-semibold !text-black" >
                Get organized, and right <br /> to fixing bugs
            </Text>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center md:h-[100vh] bg-[#e4faee] w-full p-[20px_30px] ">
            <Text className=" text-3xl text-center font-semibold !text-black" >
                  Collaborate on squashing bugs, <br /> and fixing issues with ease
            </Text>
            <div className="flex mt-10 flex-col md:flex-row w-full items-center justify-between">
              <div className="flex flex-col items-center justify-center">
                <Image src={"/illustrations/collaborate.svg"} width={400} height={300} />
              </div>
              <div className="flex flex-col items-center justify-center bg-transparent rounded-[10px] overflow-hidden shadow-2xl">
                <Image src={"/examples/comments.png"} width={750} height={380} />
              </div>
            </div>
      </div>

      <div className="flex flex-col items-center justify-center md:h-[100vh] w-full p-[20px_30px] ">
            <Text className=" text-3xl text-center font-semibold !text-black" >
                  Focus on managing only what <br /> you have been assigned
                  and filter out the rest
            </Text>
            <div className="flex mt-10 flex-col md:flex-row w-full items-center justify-between">
              
              <div className="flex flex-col items-center justify-center bg-transparent rounded-[10px] overflow-hidden shadow-2xl">
                <Image src={"/examples/manage_issues.png"} width={750} height={380} />
              </div>
              <div className="flex flex-col items-center justify-center">
                <Image src={"/illustrations/manage.svg"} width={400} height={300} />
              </div>
            </div>
      </div>

      <div className="flex flex-col items-center justify-center h-[100vh] w-full p-[20px_30px] ">
            <Text className=" text-3xl text-center font-semibold !text-black" >
                  Manage and create <br />
                  multiple projects from a single dashboard
            </Text>
            <div className="flex mt-10 flex-row w-full items-center justify-center">
              
              <div className="flex flex-col items-center justify-center bg-transparent rounded-[10px] overflow-hidden shadow-2xl">
                <Image src={"/examples/projects.png"} width={750} height={380} />
              </div>
            </div>
      </div>

      <div className="flex flex-col items-center justify-center h-[100vh] w-full p-[20px_30px] ">
            <Text className=" text-3xl text-center font-semibold !text-black" >
                  Communicate effectively <br />
                   with all members of the team.
            </Text>
            <div className="flex mt-10 flex-row w-full items-center justify-center">
              
              <div className="flex flex-col items-center justify-center bg-transparent rounded-[10px] overflow-hidden shadow-2xl">
                <Image src={"/examples/communicate.png"} width={750} height={380} />
              </div>
            </div>
      </div>

      <div className="flex flex-col items-center justify-center h-[100vh] w-full p-[20px_30px] ">
            <Text className=" text-3xl text-center font-semibold !text-black" >
                  Everything in one place
            </Text>
            <div className="flex mt-10 flex-row w-full items-center justify-center">
              
              <div className="flex flex-col items-center justify-center bg-transparent ">
                <Image src={"/examples/everything.png"} width={900} height={400} />
              </div>
            </div>
      </div>
      
      <Divider/>
      <Text className=" text-3xl text-center font-semibold !text-black" >
                  If you are a developer, <br />
                  this is the right tool for you 😉
            </Text>
      
      <Image  src={"/icons/bug.svg"}  width={400} height={300} />
      <div className="flex flex-col bg-[#1b273b] h-[200px] w-full items-center justify-center">
            <Text className=" text-lg text-center   font-semibold !text-white" >
                  Built with ❤️ and ⚡by <a target="blank" href="https://github.com/porkytheblack" >
                    <Typography.Link>
                        porkytheblack
                    </Typography.Link>
                  </a>
            </Text>
      </div>
    </HomeContainer>    
  )
}

export default Home

const HomeContainer = styled.div`
  
`
