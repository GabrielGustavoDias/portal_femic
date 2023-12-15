import { AlertTemplateProps } from 'react-alert';
import { FiCheckCircle, FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { ContainerAlert, Text } from './styles';

export default function AlertTemplate({ style, options, message, close }) {
  return (
    <ContainerAlert style={style}>
      {options.type === 'info' && <FiAlertCircle size={23} color="#14e" />}
      {options.type === 'success' && (
        <FiCheckCircle size={23} color="#42ba96" />
      )}
      {options.type === 'error' && <FiXCircle size={23} color="#FF3333" />}
      <Text>{message}</Text>
      <button onClick={close}>X</button>
    </ContainerAlert>
  );
}
