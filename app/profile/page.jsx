'use client'

import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react'
import { logout } from '@src/services/auth'
import { editUserData } from '@src/services/user'
import colors from '@src/styles/colors'
import { Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { LiaStarSolid } from 'react-icons/lia'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  address: Yup.string().required('Address is required'),
})

export default function Profile() {
  const router = useRouter()
  const toast = useToast()
  const [user, setUser] = useState()
  const [editMode, setEditMode] = useState(false)
  const [avatarImage, setAvatarImage] = useState(user?.profilePhoto)
  const [submitting, setSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  const initialValues = {
    ...user,
  }

  const handleToggleEditMode = () => {
    setEditMode(!editMode)
    setAvatarImage(user?.profilePhoto)
  }

  const handleEditProfilePhoto = () => {
    fileInputRef.current.click()
  }

  const handleImageChange = e => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarImage(reader.result)
        console.log(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (e) {}
  }

  const handleSubmit = async values => {
    if (submitting) return
    setSubmitting(true)
    try {
      console.log(user)
      const newData = {
        ...values,
        profilePhoto: avatarImage,
      }
      const res = await editUserData(user?.id, newData)
      if (!res) {
        toast({
          title: 'Error',
          description: res,
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top',
        })
        return
      }
      window.location.reload()
      toast({
        title: 'Profile updated.',
        description: 'Your profile has been updated.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
    } catch (error) {
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = JSON.parse(localStorage.getItem('user'))
      if (!userData) router.push('/')
      else setUser(userData)
    }
  }, [])

  return (
    <Flex w="100%" flexDir="column" minHeight="80vh" padding="2rem 5rem">
      <Flex w="100%" justifyContent="space-between" alignItems="center">
        <Heading fontSize="3em">My Profile</Heading>
        <Box>
          <Button colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Flex>

      <Flex w="100%" flexDir="column" mt="2rem" px="4rem">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Flex w="100%" gap="4rem">
              <Box>
                {!editMode ? (
                  <Avatar name={user?.name} src={avatarImage} size="2xl">
                    <AvatarBadge boxSize="1em" bg="white">
                      <LiaStarSolid color="orange" size="1em" />
                    </AvatarBadge>
                  </Avatar>
                ) : (
                  <FormControl>
                    <Box position="relative">
                      <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                      />

                      <Box onClick={handleEditProfilePhoto} cursor="pointer">
                        <Avatar name={user?.name} src={avatarImage} size="2xl">
                          <AvatarBadge boxSize="1em" bg="white">
                            <LiaStarSolid color="orange" size="1em" />
                          </AvatarBadge>
                        </Avatar>
                      </Box>
                    </Box>
                  </FormControl>
                )}
              </Box>
              <Flex flexDir="column" gap="0.2rem" w="100%">
                <Flex gap="1rem" alignItems="center" w="100%">
                  {editMode ? (
                    <Flex gap="4rem" alignItems="center" w="100%">
                      <Text width="100px">Name:</Text>
                      <Field name="name">
                        {({ field, meta }) => (
                          <FormControl isInvalid={meta.touched && !!meta.error}>
                            <Input {...field} placeholder="Enter your name" />
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                  ) : (
                    <>
                      <Heading>{user?.name}</Heading>
                      <FiEdit
                        style={{ cursor: 'pointer' }}
                        onClick={handleToggleEditMode}
                      />
                    </>
                  )}
                </Flex>

                <Flex gap="4rem" alignItems="center">
                  <Text width="100px">Username: </Text>
                  {editMode ? (
                    <Field name="username">
                      {({ field, meta }) => (
                        <FormControl isInvalid={meta.touched && !!meta.error}>
                          <Input
                            {...field}
                            placeholder="Enter your username"
                            isDisabled
                          />
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  ) : (
                    <Text textAlign="left" fontWeight="bold">
                      {user?.username}
                    </Text>
                  )}
                </Flex>

                <Flex gap="4rem" alignItems="center">
                  <Text width="100px">Email: </Text>
                  {editMode ? (
                    <Field name="email">
                      {({ field, meta }) => (
                        <FormControl isInvalid={meta.touched && !!meta.error}>
                          <Input
                            {...field}
                            placeholder="Enter your email"
                            isDisabled
                          />
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  ) : (
                    <Text textAlign="left" fontWeight="bold">
                      {user?.email}
                    </Text>
                  )}
                </Flex>

                {editMode ? (
                  <Flex gap="4rem" alignItems="center">
                    <Text width="100px">Address: </Text>
                    <Field name="address">
                      {({ field, meta }) => (
                        <FormControl isInvalid={meta.touched && !!meta.error}>
                          <Input {...field} placeholder="Enter your address" />
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                ) : (
                  <Text>{user?.address}</Text>
                )}

                {editMode && (
                  <Flex w="100%" justifyContent="flex-end" gap="1rem">
                    <Box>
                      <Button
                        mt="2"
                        colorScheme="red"
                        onClick={handleToggleEditMode}
                      >
                        Cancel
                      </Button>
                    </Box>
                    <Box>
                      <Button
                        mt="2"
                        backgroundColor={colors.blue}
                        color="white"
                        _hover={{
                          backgroundColor: colors.darkerBlue,
                        }}
                        type="submit"
                        isLoading={submitting}
                      >
                        Save Changes
                      </Button>
                    </Box>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Form>
        </Formik>
      </Flex>
    </Flex>
  )
}
