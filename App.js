import React, {useState, useEffect} from 'react'
import styled from 'styled-components/native'
import {Text} from 'react-native';

export default () => {

  const [bill, setBill] = useState('')
  const [tip, setTip] = useState(0)
  const [pct, setPct] = useState(10)

  const verifyAction = () => {
    if(bill) {
      calc();
    } else {
      alert("Insira o valor da conta!")
    }
  }

  const calc = () => {
    if(bill) {
      let nBill = parseFloat(bill)
      setTip((pct / 100) * nBill)
    }
  }

  useEffect(() => {
    calc();
  }, [pct]);

  useEffect(() => {
    if(bill == "") {
      setTip(0)
    }
  }, [bill])

  return (
    <Page>
      <HeaderText>Calculadora de Gorjeta</HeaderText>
      <Input 
        placeholder="Quanto deu a conta ?"  
        keyboardType="numeric"
        value={bill}
        onChangeText={n => setBill(n)}
      />
      <Text style={{textAlign: 'center', fontSize: 25, fontWeight: 'bold'}}>Selecione a %</Text>
      <PctArea>
        <PctItem onPress={() => setPct(5)}><PctText>5%</PctText></PctItem>
        <PctItem onPress={() => setPct(10)}><PctText>10%</PctText></PctItem>
        <PctItem onPress={() => setPct(15)}><PctText>15%</PctText></PctItem>
        <PctItem onPress={() => setPct(20)}><PctText>20%</PctText></PctItem>
      </PctArea>
      <BtnAction title={`Calcular ${pct}%`} onPress={verifyAction} />
      {tip > 0 &&
        <AreaResult>
          <ResultItemTitle>Valor da Conta</ResultItemTitle>
          <ResultItem>R$ {parseFloat(bill).toFixed(2)}</ResultItem>

          <ResultItemTitle>Valor da Gorjeta</ResultItemTitle>
          <ResultItem>R$ {`${tip.toFixed(2)} (${pct}%)`}</ResultItem>

          <ResultItemTitle>Total</ResultItemTitle>
          <ResultItem>R$ {(parseFloat(bill) + tip).toFixed(2)}</ResultItem>
        </AreaResult>
      }
    </Page>
  )
}


const Page = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

const HeaderText = styled.Text`
  font-size: 25px;
  margin: 20px 0;
`;

const Input = styled.TextInput`
  height: 40px;
  width: 90%;
  background: #EEE;
  padding: 10px;
  border-radius: 5px;
  font-size: 18px;
  margin-bottom: 15px;
`;

const BtnAction = styled.Button``;

const AreaResult = styled.View`
  width: 100%;
  background: #EEE;
  padding: 10px;
  margin-top: 30px;
  align-items: center;
`;

const ResultItemTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const ResultItem = styled.Text`
  font-size: 15px;
  margin-bottom: 30px;
`;

const PctArea = styled.View`
  width: 100%;
  justify-content: center;
  margin: 20px 0;
  flex-direction: row;
`;

const PctItem = styled.TouchableOpacity`
  background: #888;
  padding: 5px;
  margin: 0 10px;
  border-radius: 5px;
  width: 50px;
`;

const PctText = styled.Text`
  font-size: 18px;
  color: #FFF;
  text-align: center;
`;