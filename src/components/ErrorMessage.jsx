//ara el manej de erores(cuando no se encuentra el pke  falla la aAPI)
import PropTypes from 'prop-types';

function ErrorMessage({ message }) {
    return <p style={{ color: 'red' }}>{message}</p>;
}

//para validar las propiedades
ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,    // 'message' es una cadena obligatoria
};

export default ErrorMessage;




















/**
 * prop-types es util para el mantenimiento porque entender tipos de datos que se espera que pasen a los componentes,alertando de errores cuando pasan propiedades incorrectas. Acctuando como una forma de documentaciion para los componentes.
 */