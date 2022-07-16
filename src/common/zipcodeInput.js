import React from 'react';
import InputMask from 'react-input-mask';

export default function ZipCodeInput (props) {
        return <InputMask aria-label='E.g 20001 (For Washington DC)' {...props} mask="*****" maskChar="" />;
}