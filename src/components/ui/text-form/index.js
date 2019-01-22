import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

const TextForm = ({onInputText = f => f, smallSize = false, btnName = 'Ввести', placeholder = ''}) => {
    let textInput = React.createRef();

    function handlerSubmit(e) {
        e.preventDefault();
        const text = textInput.current.value.trim();
        textInput.current.value = '';
        textInput.current.focus();
        onInputText(text);
    }

    return (
        <div className={'text-form'}>
            <form onSubmit={handlerSubmit}>
                <input className={((smallSize)?'input-small ':'') + 'input'}
                       type="text"
                       ref={textInput} placeholder={placeholder}/>
                <button className={((smallSize)?'btn-small ':'') + 'btn btn-secondary'}  type="Submit">{btnName}</button>
            </form>
        </div>
    );
};

TextForm.propTypes = {
    onInputText: PropTypes.func,
    smallSize: PropTypes.bool,
    btnName: PropTypes.string,
    placeholder: PropTypes.string
};

export default TextForm;