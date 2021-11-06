import React from "react";
import { Button, Table, ButtonGroup } from 'react-bootstrap'
// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react'
import Header from "../Header.js";
import Lokator from './Lokator'
import EdytujLokator from './EdytujLokator'

import lokaleAPI from "../Axios/lokaleAPI";
import najmyAPI from "../Axios/najmyAPI";
import najmyLokatorzyAPI from "../Axios/najmyLokatorzyAPI";
import nieruchomosciAPI from "../Axios/nieruchomosciAPI";

const WynajeteLokale = ({ match: { params: { id } } }) => {
  const la = new lokaleAPI();
  const na = new najmyAPI();
  const nla = new najmyLokatorzyAPI();
  const nia = new nieruchomosciAPI();

  const [dodajLokatora, setDodajLokatora] = React.useState(false)
  const [edytujLokatora, setEdytujLokatora] = React.useState(false)
  const [aktualizuj, setAktualizuj] = React.useState(true)

  const [najemDisplay, setNajemDisplay] = React.useState([]);

  const [idNajmu, setIdNajmu] = React.useState(null);
  const [idLokatora, setIdLokatora] = React.useState(null);

  useEffect(() => {
    console.log(id)
    setAktualizuj(false)
    getWynajeteLokale();
  }, [aktualizuj]);

  const getWynajeteLokale = () => {
    na.getMojeNajmy(id).then(response => {
      console.log(response)
      setNajemDisplay(response)
    }).catch(e => {
      console.log(e)
    })
  }

  async function btnEdytuj(id) {
    console.log("BTN Edytuj")
    console.log(id)

    setIdLokatora(id);
    setEdytujLokatora(true);

    setAktualizuj(true);
  }

  async function btnDodajLokatora(id) {
    console.log("BTN DodajLokatora");
    console.log(id)
    setIdNajmu(id);
    setDodajLokatora(true)

    setAktualizuj(true);
  }


  return (
    <>
      <Header tytul='Lokale' par='Poniżej znajduje się lista wynajętych przez Ciebie lokali!' />
      <Table responsive hover boarded>
        <thead className="thead-dark">
          <tr>
            <th className="text-center" scope="col">Lp.</th>
            <th className="text-center" scope="col">Wspólnota</th>
            <th className="text-center" scope="col">Adres</th>
            <th className="text-center" scope="col">Powierzchnia</th>
            <th className="text-center" scope="col">Cena</th>
            <th className="text-center" scope="col">Lokatorzy</th>
            <th className="text-center" scope="col">Opcje</th>
          </tr>
        </thead>
        <tbody>{
          najemDisplay.map(najem => (
            <tr key={najem.idNajmu}>
              <td className="align-middle">{najem.idNajmu}</td>
              <td className="align-middle">{najem.wspolnota}</td>
              <td className="align-middle">{najem.adres}</td>
              <td className="align-middle">{najem.powierzchnia}</td>
              <td className="align-middle">{najem.cena}</td>
              <td className="align-middle">
                <Table responsive hover boarded>
                  <thead className="thead-dark">
                    <tbody>{
                      najem.lokatorzy.map(lokatorzy => (
                        <tr key={lokatorzy.id}>
                          <td className="align-middle">{lokatorzy.imie} {lokatorzy.nazwisko}</td>
                          <td className="align-middle">
                            <ButtonGroup size='sm' aria-label="Basic example">
                              <Button className="ml-2 mr-2" variant="info" onClick={() => btnEdytuj(lokatorzy.id)}>Edytuj</Button>
                            </ButtonGroup>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </thead>
                </Table></td>
              <td className="align-middle">
                <Button size='sm' variant="success" onClick={() => btnDodajLokatora(najem.idNajmu)}>Dodaj lokatora</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Lokator
        show={dodajLokatora}
        onHide={() => { { setDodajLokatora(false); setAktualizuj(true); setIdNajmu(null) } }}
        idNajmu={idNajmu} />
      <EdytujLokator
        show={edytujLokatora}
        onHide={() => { { setEdytujLokatora(false); setAktualizuj(true); setIdLokatora(null) } }}
        idLokatora={idLokatora} />
    </>
  )

}

export default WynajeteLokale