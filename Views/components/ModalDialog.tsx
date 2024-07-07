
import { useCallback, useState } from 'react';


import { css } from '@emotion/react';

import Button from '@atlaskit/button/new';

import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle, ModalTransition } from '@atlaskit/modal-dialog';

const boldStyles = css({
    fontWeight: 'bold',
});

export default function ModalDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = useCallback(() => setIsOpen(true), []);
    const closeModal = useCallback(() => setIsOpen(false), []);

    return (
        <div>
            <Button appearance="primary" onClick={openModal}>
                Open modal
            </Button>

            <ModalTransition>
                {isOpen && (
                    <Modal onClose={closeModal}>
                        <ModalHeader>
                            <ModalTitle>Duplicate this page</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            Duplicating this page will make it a child page of{' '}
                            <span >Search - user exploration</span>, in the{' '}
                            <span >Search & Smarts</span> space.
                        </ModalBody>
                        <ModalFooter>
                            <Button appearance="subtle" onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button appearance="primary" onClick={closeModal}>
                                Duplicate
                            </Button>
                        </ModalFooter>
                    </Modal>
                )}
            </ModalTransition>
        </div>
    );
}