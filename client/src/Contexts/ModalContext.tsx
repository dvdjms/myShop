import React, { createContext, useContext, useState, ReactNode} from 'react';


type ModalType = 'signIn' | 'signUp';

type ModalContextType = {
      isModalOpen: boolean;
      modalType: ModalType | null;
      openModal: (type: ModalType) => void;
      closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

type ModalProviderProps = {
      children: ReactNode;
};

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {

      const [isModalOpen, setIsModalOpen] = useState(false);
      const [modalType, setModalType] = useState<ModalType | null>(null);

      const openModal = (type: ModalType) => {
            setIsModalOpen(true);
            setModalType(type);
      };

      const closeModal = () => {
            setIsModalOpen(false);
            setModalType(null);
      };

      const modalContext: ModalContextType = {
            isModalOpen,
            modalType,
            openModal,
            closeModal,
      };

      return (
            <ModalContext.Provider value={modalContext}>
                  {children}
            </ModalContext.Provider>
      );
};

export const useModal = (): ModalContextType => {
      const context = useContext(ModalContext);
      if (!context) {
            throw new Error('useModal must be used within a ModalProvider');
      };
      return context;
};


