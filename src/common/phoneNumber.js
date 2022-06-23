import React from 'react';
import InputMask from 'react-input-mask';

export default function PhoneInput (props) {
        return <InputMask aria-label='E.g 121-345-7895' {...props} mask="***-***-****" maskChar="" />;
}