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
  Input,
  Select,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import Result from '@src/components/Modal/Result'
import colors from '@src/styles/colors'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

function formatRupiah(input) {
  const number = parseInt(input.replace('Rp ', ''))
  if (isNaN(number)) {
    return 'Rp. 0'
  }

  const numArray = number.toString().split('')

  numArray.reverse()

  for (let i = 3; i < numArray.length; i += 4) {
    numArray.splice(i, 0, '.')
  }

  const result = 'Rp ' + numArray.reverse().join('')

  return result
}

function parseRupiah(rupiahString) {
  let cleanedString = ''
  rupiahString.split('').forEach(char => {
    if (/^[+-]?\d+(\.\d+)?$/.test(char)) {
      cleanedString += char
    }
  })
  return cleanedString
}

const validationSchema = Yup.object().shape({
  power: Yup.number().required('Power is required'),
  expenses: Yup.string().required('Expenses is required'),
  appliance: Yup.number()
    .moreThan(0, 'Appliance must be greater than 0')
    .max(5, 'Appliance cannot exceed 5')
    .required('Appliance is required'),
})

const powerOption = [
  {
    group: 'R-1/TR',
    powerCapacity: '900 VA',
    rate: 1352,
    description: 'Rp 1.352 per kWh',
  },
  {
    group: 'R-1/TR',
    powerCapacity: '1.300 VA',
    rate: 1444.7,
    description: 'Rp 1.444,70 per kWh',
  },
  {
    group: 'R-1/TR',
    powerCapacity: '2.200 VA',
    rate: 1444.7,
    description: 'Rp 1.444,70 per kWh',
  },
  {
    group: 'R-2/TR',
    powerCapacity: '3.500-5.500 VA',
    rate: 1699.53,
    description: 'Rp 1.699,53 per kWh',
  },
  {
    group: 'R-3/TR',
    powerCapacity: '6.600 VA ke atas',
    rate: 1699.53,
    description: 'Rp 1.699,53 per kWh',
  },
  {
    group: 'B-2/TR',
    powerCapacity: '6.600 VA-200 kVA',
    rate: 1444.7,
    description: 'Rp 1.444,70 per kWh',
  },
  {
    group: 'B-3',
    powerCapacity: 'Tegangan Menengah (TM) daya di atas 200 kVA',
    rate: 1114.74,
    description: 'Rp 1.114,74 per kWh',
  },
  {
    group: 'I-3',
    powerCapacity: 'TM daya di atas 200 kVA',
    rate: 1114.74,
    description: 'Rp 1.114,74 per kWh',
  },
  {
    group: 'I-4',
    powerCapacity: 'Tegangan Tinggi (TT) daya 30.000 kVA ke atas',
    rate: 996.74,
    description: 'Rp 996,74 per kWh',
  },
  {
    group: 'P-1/TR',
    powerCapacity: '6.600 VA-200 kVA',
    rate: 1699.53,
    description: 'Rp 1.699,53 per kWh',
  },
  {
    group: 'P-2',
    powerCapacity: 'TM daya di atas 200 kVA',
    rate: 1522.88,
    description: 'Rp 1.522,88 per kWh',
  },
  {
    group: 'P-3/TR',
    powerCapacity: 'untuk penerangan jalan umum',
    rate: 1699.53,
    description: 'Rp 1.699,53 per kWh',
  },
  {
    group: 'L/TR, TM, TT',
    rate: 1644.52,
    description: 'Rp 1.644,52 per kWh',
  },
]

export default function Home() {
  const [isNext, setIsNext] = useState(false)
  const [result, setResult] = useState(false)
  const toast = useToast()
  const { onOpen, onClose, isOpen } = useDisclosure()
  const initialValues = {
    power: 0,
    appliance: 0,
    expenses: '0',
    appliances: [],
  }

  const handleOnClose = () => {}

  const handleSubmit = (
    values,
    { setFieldValue, setSubmitting, resetForm },
  ) => {
    try {
      if (!isNext) {
        const newAppliances = Array.from(
          { length: values.appliance },
          (_, index) => ({
            name: '',
            usage: 0,
            electricity: 0,
          }),
        )
        setFieldValue('appliances', newAppliances)
        setIsNext(true)
        return
      }
      let totalUsage = 0
      values.appliances.map(appliance => {
        totalUsage += appliance.usage * appliance.electricity * 30
      })
      const totalCost = totalUsage * powerOption[values.power].rate
      const totalExpenses = parseFloat(parseRupiah(values.expenses))
      if (!isNaN(totalExpenses)) {
        const limit = totalExpenses * 1.15
        if (totalCost <= limit) {
          setResult(true)
        } else {
          setResult(false)
        }
        onOpen()
        resetForm()
        setIsNext(false)
        return
      }
      toast({
        title: 'Error',
        description: 'Expenses is not valid',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      })
    } catch (err) {
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
      padding="2rem 20%"
    >
      <Result onClose={onClose} isOpen={isOpen} isSafe={result} />
      <Flex gap="1rem" justifyContent="center" mb="2rem">
        <Heading fontSize="2em">Calculate your power expences</Heading>
      </Flex>

      <Flex
        w="100%"
        boxShadow="1px 4px 10px 2.5px rgba(0, 0, 0, 0.2)"
        padding="2rem"
        borderRadius="20px"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form style={{ width: '100%' }}>
              <Grid templateColumns="1fr" gap={4} w="100%">
                {!isNext ? (
                  <>
                    <GridItem>
                      <Field name="power">
                        {({ field, meta }) => (
                          <FormControl isInvalid={meta.touched && !!meta.error}>
                            <FormLabel htmlFor="power">Power (kWh)</FormLabel>
                            <Select {...field} id="power">
                              {powerOption.map((power, idx) => (
                                <option value={idx} key={idx}>
                                  {power.group} {power.powerCapacity}
                                </option>
                              ))}
                            </Select>
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>

                    <GridItem>
                      <Field name="appliance">
                        {({ field, meta }) => (
                          <FormControl isInvalid={meta.touched && !!meta.error}>
                            <FormLabel htmlFor="appliance">
                              Appliance count (up to 5)
                            </FormLabel>
                            <Input
                              {...field}
                              id="appliance"
                              placeholder="Enter appliace"
                              type="number"
                            />
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>

                    <GridItem>
                      <Field name="expenses">
                        {({ field, meta }) => (
                          <FormControl isInvalid={meta.touched && !!meta.error}>
                            <FormLabel htmlFor="expenses">
                              1 Month electricity expenses (example: 200,000)
                            </FormLabel>
                            <Input
                              {...field}
                              id="expenses"
                              placeholder="Enter expenses"
                              type="text"
                              value={formatRupiah(values.expenses)}
                              onChange={e => {
                                const rupiah = parseRupiah(e.target.value)
                                setFieldValue('expenses', rupiah)
                              }}
                            />
                            <FormErrorMessage>{meta.error}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </GridItem>
                  </>
                ) : (
                  <>
                    <Flex>
                      <Input
                        value="Appliance"
                        disabled
                        style={{
                          border: 'none',
                          opacity: 1,
                          cursor: 'default',
                        }}
                      />
                      <Input
                        value="Electricity"
                        disabled
                        style={{
                          border: 'none',
                          opacity: 1,
                          cursor: 'default',
                        }}
                      />
                      <Input
                        value="Usage Time (hours)"
                        disabled
                        style={{
                          border: 'none',
                          opacity: 1,
                          cursor: 'default',
                        }}
                      />
                    </Flex>
                    {values?.appliances?.map((appliance, idx) => (
                      <Flex key={idx} gap="1rem" w="100%">
                        <Input
                          type="text"
                          style={{
                            opacity: 1,
                            cursor: 'default',
                          }}
                          onChange={e => {
                            let currentAppliances = values.appliances
                            currentAppliances[idx].name = e.target.value
                            setFieldValue('appliances', currentAppliances)
                          }}
                        />
                        <Input
                          value={appliance.usage}
                          type="number"
                          onChange={e => {
                            let currentAppliances = values.appliances
                            currentAppliances[idx].usage = e.target.value
                            setFieldValue('appliances', currentAppliances)
                          }}
                        />

                        <Input
                          value={appliance.electricity}
                          type="number"
                          onChange={e => {
                            let currentAppliances = values.appliances
                            currentAppliances[idx].electricity = e.target.value
                            setFieldValue('appliances', currentAppliances)
                          }}
                        />
                      </Flex>
                    ))}
                  </>
                )}
                <Flex w="100%" justifyContent="flex-end" mt="2rem">
                  <Box>
                    <Button
                      backgroundColor={colors.orange}
                      color="white"
                      _hover={{
                        backgroundColor: colors.darkerOrange,
                      }}
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      {isNext ? 'Analyze' : 'Next'}
                    </Button>
                  </Box>
                </Flex>
              </Grid>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  )
}
