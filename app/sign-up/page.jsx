'use client'

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  useToast,
} from '@chakra-ui/react'
import { register } from '@src/services/auth'
import colors from '@src/styles/colors'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  address: Yup.string().required('Address is required'),
})

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const toast = useToast()

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword)
  }

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prevShowConfrimPassword => !prevShowConfrimPassword)
  }

  const initialValues = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
  }

  const handleSubmit = async values => {
    if (submitting) return
    setSubmitting(true)
    try {
      const { name, username, email, password, address } = values
      const res = await register(name, username, email, password, address)
      if (res != 'success') {
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
      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message ?? error,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Flex
      w="100%"
      flexDir="column"
      alignItems="center"
      minHeight="80vh"
      padding="2rem 5rem"
    >
      <Flex gap="1rem" alignItems="baseline">
        <Heading color={colors.blue} fontSize="2.5em">
          Sign Up for
        </Heading>
        <Box>
          <Image src="/images/logo.png" alt="m00re" />
        </Box>
      </Flex>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form style={{ width: '100%' }}>
          <Grid templateColumns="1fr 1fr" w="100%" columnGap="2rem">
            <GridItem>
              <Field name="name">
                {({ field, meta }) => (
                  <FormControl
                    isInvalid={meta.touched && !!meta.error}
                    mt="1rem"
                  >
                    <FormLabel htmlFor="name">
                      Name<span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <Input {...field} id="name" placeholder="Enter your name" />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </GridItem>

            <GridItem>
              <Field name="username">
                {({ field, meta }) => (
                  <FormControl
                    isInvalid={meta.touched && !!meta.error}
                    mt="1rem"
                  >
                    <FormLabel htmlFor="username">
                      Username<span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <Input
                      {...field}
                      id="username"
                      placeholder="Enter your username"
                    />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </GridItem>

            <GridItem>
              <Field name="email">
                {({ field, meta }) => (
                  <FormControl
                    isInvalid={meta.touched && !!meta.error}
                    mt="1rem"
                  >
                    <FormLabel htmlFor="email">
                      Email<span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <Input
                      {...field}
                      id="email"
                      placeholder="Enter your email"
                    />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </GridItem>

            <GridItem>
              <Field name="password">
                {({ field, meta }) => (
                  <FormControl
                    isInvalid={meta.touched && !!meta.error}
                    position="relative"
                    mt="1rem"
                  >
                    <FormLabel htmlFor="password">
                      Password<span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <Flex align="center">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        placeholder="Enter your password"
                        width="100%"
                      />
                      <Box ml="1" position="absolute" right={5}>
                        {showPassword ? (
                          <FaEyeSlash
                            onClick={handleTogglePasswordVisibility}
                          />
                        ) : (
                          <FaEye onClick={handleTogglePasswordVisibility} />
                        )}
                      </Box>
                    </Flex>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </GridItem>
            <GridItem>
              <Field name="confirmPassword">
                {({ field, meta }) => (
                  <FormControl
                    isInvalid={meta.touched && !!meta.error}
                    mt="1rem"
                  >
                    <FormLabel htmlFor="confirmPassword">
                      Confirm Password<span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <Flex align="center">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        width="100%"
                      />
                      <Box ml="1" position="absolute" right={5}>
                        {showConfirmPassword ? (
                          <FaEyeSlash
                            onClick={handleToggleConfirmPasswordVisibility}
                          />
                        ) : (
                          <FaEye
                            onClick={handleToggleConfirmPasswordVisibility}
                          />
                        )}
                      </Box>
                    </Flex>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </GridItem>
            <GridItem>
              <Field name="address">
                {({ field, meta }) => (
                  <FormControl
                    isInvalid={meta.touched && !!meta.error}
                    mt="1rem"
                  >
                    <FormLabel htmlFor="address">
                      Address<span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <Input
                      {...field}
                      id="address"
                      placeholder="Enter your address"
                    />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </GridItem>
          </Grid>

          <Flex w="100%" justifyContent="flex-end" mt="2rem">
            <Box>
              <Button
                backgroundColor={colors.orange}
                color="white"
                _hover={{
                  backgroundColor: colors.darkerOrange,
                }}
                isLoading={submitting}
                type="submit"
              >
                Sign Up
              </Button>
            </Box>
          </Flex>
        </Form>
      </Formik>
    </Flex>
  )
}
