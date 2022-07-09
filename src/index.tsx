import { Form, ActionPanel, Action } from "@raycast/api";
import { useState } from 'react';

type Values = {
  input: string;
  decimal: string;
  hex: string;
  binary: string;
  octal: string;
};

export default function Command() {
  const [decimal, setDecimal] = useState('');
  const [hex, setHex] = useState('');
  const [binary, setBinary] = useState('');
  const [octal, setOctal] = useState('');

  function getDecimal(values: Values) : number {
    let decimal : number;
    if (values.input.charAt(0) === '0') {
      if (values.input.charAt(1) === 'x') {
        decimal = parseInt(values.input.substring(2), 16);
      }
      else if (values.input.charAt(1) === 'b') {
        decimal = parseInt(values.input.substring(2), 2);
      }
      else {
        decimal = parseInt(values.input.substring(1), 8);
      }
    } else {
      decimal = parseInt(values.input);
    }
    return decimal;
  }

  function handleSubmit(values: Values) {
    let decimal : number = getDecimal(values);

    setDecimal(decimal.toString());
    values.binary = '0b' + decimal.toString(2);
    setBinary(values.binary);
    values.hex = '0x' + decimal.toString(16).toUpperCase();
    setHex(values.hex);
    values.octal = '0' + decimal.toString(8);
    setOctal(values.octal);
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="input" title="Input" placeholder="Enter a number e.g: 0b101, 0xA3, 51, 062" />
      <Form.Separator />
      <Form.TextField id="decimal" title="Decimal Representation" placeholder="420" value={decimal.toString()} />
      <Form.TextField id="binary" title="Binary Representation" placeholder="0b110100100" value={binary} />
      <Form.TextField id="octal" title="Octal Representation" placeholder="0644" value={octal} />
      <Form.TextField id="hex" title="Hex Representation" placeholder="0x1A4" value={hex} />

    </Form>
  );
}
