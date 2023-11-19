'use client'

import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react'
import colors from '@src/src/styles/colors'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BsLightbulb, BsLightningCharge } from 'react-icons/bs'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import Login from '../Auth/Login'

const routes = [
  {
    name: 'Project',
    path: '/project',
    icon: <BsLightningCharge />,
  },
  {
    name: 'Services',
    path: '/services',
    icon: <BsLightbulb />,
  },
  {
    name: 'About Us',
    path: '/about-us',
    icon: <HiOutlineUserGroup />,
  },
]

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const pathname = usePathname()

  console.log(pathname)

  return (
    <>
      <Login isOpen={isOpen} onClose={onClose} />
      <Flex
        w="100%"
        padding="1rem 3rem"
        alignItems="center"
        gap="2rem"
        justifyContent="space-between"
      >
        <Link href="/">
          <Box>
            <Image src="/images/logo.png" width={180} height={60} />
          </Box>
        </Link>
        <Flex gap="4rem" alignItems="center">
          <Flex gap="2rem" fontSize="1.2em">
            {routes.map((route, idx) => (
              <Link href={route.path} key={idx}>
                <Flex
                  alignItems="center"
                  gap="0.5rem"
                  _hover={{ color: colors.orange }}
                  color={pathname == route.path ? colors.orange : ''}
                >
                  {route.icon}
                  <Text fontWeight="bold">{route.name}</Text>
                </Flex>
              </Link>
            ))}
          </Flex>
          <Flex gap="1rem" fontSize="1.2em">
            <Button border={`1px solid ${colors.black}`} onClick={onOpen}>
              Login
            </Button>
            <Link href="/sign-up">
              <Button
                backgroundColor={colors.blue}
                color="white"
                padding="0.2rem 1rem"
                borderRadius="5px"
                fontWeight="bold"
                fontSize="0.8em"
                _hover={{
                  backgroundColor: '#1A428E',
                }}
              >
                Sign Up
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
