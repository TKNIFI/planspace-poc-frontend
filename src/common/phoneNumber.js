import React from 'react';
import InputMask from 'react-input-mask';

export default function PhoneInput (props) {
        return <InputMask {...props} mask="***-***-****" maskChar="" />;
}