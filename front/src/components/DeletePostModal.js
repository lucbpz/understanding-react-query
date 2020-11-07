import React from 'react';

import {Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter} from '@chakra-ui/core'

const DeletePostModal = ({isOpen, onClose}) => {

    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size="full">
            <ModalOverlay />
            <ModalContent m="0" position="fixed" top="auto" bottom="0" >
                <ModalHeader>Delete Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Are you sure you want to delete this post?
                </ModalBody>

                <ModalFooter>
                    <Button variantColor="blue" mr={3} onClick={() => onClose(true)}>
                        Yes
                    </Button>
                    <Button onClick={() => onClose()} variant="ghost">No</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeletePostModal;