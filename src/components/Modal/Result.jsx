'use client'

import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react'
import { AiOutlineSafety } from 'react-icons/ai'
import { CgDanger } from 'react-icons/cg'

export default function Result({ isOpen, onClose, isSafe }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="20px" padding="1rem 0.5rem">
        <ModalCloseButton />

        <ModalBody>
          <Flex
            w="100%"
            h="100%"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            color={isSafe ? 'green' : 'red'}
            gap="2rem"
          >
            {isSafe ? (
              <>
                <AiOutlineSafety size="6em" />
                <Heading size="2.5em" textAlign="center">
                  Your electricity is reasonable
                </Heading>
              </>
            ) : (
              <>
                <CgDanger size="6em" />
                <Heading size="2.5em" textAlign="center">
                  Your electricity is not reasonable
                </Heading>
              </>
            )}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
