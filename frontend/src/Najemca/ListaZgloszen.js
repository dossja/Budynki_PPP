import React from "react";
import { useState, useEffect } from "react";
import { Button, Table, Alert } from 'react-bootstrap';

import Header from "../Header.js";
import NoweZgloszenie from './NoweZgloszenie';
import PodgladZgloszenie from './PodgladZgloszenie';

import najmyAPI from '../Axios/najmyAPI';
import zgloszeniaAPI from '../Axios/zgloszeniaAPI';
import najmyZgloszeniaAPI from '../Axios/najmyZgloszeniaAPI';


const ListaZgloszen = ({ match: { params: { id } } }) => {
  const na = new najmyAPI();
  const za = new zgloszeniaAPI();
  const nza = new najmyZgloszeniaAPI();

  const [dodajZgloszenie, setDodajZgloszenie] = React.useState(false)
  const [podgladZgloszenie, setPodgladZgloszenie] = React.useState(false)
  const [aktualizuj, setAktualizuj] = useState(false)
  const [Zgloszenia, setZgloszenia] = React.useState([])
  const [idNajmu, setIdNajmu] = React.useState(null);
  const [idNajmuDodaj, setIdNajmuDodaj] = React.useState(null);
  const [idZgloszenia, setIdZgloszenia] = React.useState(null);

  useEffect(() => {
    //refresh table
    getZgloszenia();
    setAktualizuj(false);
  }, [aktualizuj]);

  const handleOnClick = event => {
    setIdNajmuDodaj(idNajmu);
    setDodajZgloszenie(true)
  }

  const getZgloszenia = () => {
    na.get().then(responseNajmy => {
      let najmyUzytkownika = [];
      let idNajmowUzytkownika = [];
      console.log(responseNajmy.data)
      for (let i in responseNajmy.data) {
        if (responseNajmy.data[i].lokator.id == id) {
          najmyUzytkownika.push(responseNajmy.data[i]);
          idNajmowUzytkownika.push(responseNajmy.data[i].id);
        }
      }

      setIdNajmu(idNajmowUzytkownika);
      nza.getTwojeZgloszenia(idNajmowUzytkownika).then(responseNajmyZgloszenia => {
        console.log(responseNajmyZgloszenia.data)
        let zgloszeniaArray = []
        for (let i in responseNajmyZgloszenia.data) {
          console.log(responseNajmyZgloszenia.data[i]);
          // zgloszeniaArray.push()
          za.getID(responseNajmyZgloszenia.data[i].zgloszenie_id).then(respZA => {
            // const zgl = { "id": resp.id, "opis": resp.opis, "kosztCalkowity": resp.kosztCalkowity }
            zgloszeniaArray.push(respZA);

          })
        }
        console.log(zgloszeniaArray)

        // for (let i in r)

        //   za.getZgloszeniaArray(zgloszeniaArray).then(response => {
        //     setZgloszenia(response)
        //   })

        setZgloszenia(zgloszeniaArray);
      }).catch(e => {
        console.log(e);
      });;
    }).catch(e => {
      console.log(e);
    });

  };

  async function btnPodglad(idZg) {
    console.log(`ID zgloszenia: ${idZg}`)

    setIdZgloszenia(idZg);
    setPodgladZgloszenie(true);
  }

  const przyjete = (id) => {
    return (
      <>
        <td className="align-middle text-center"><Alert variant="secondary" >Zgłoszenie przyjęte</Alert></td>
      </>)
  }

  const oczekujace = (id) => {
    return (
      <>
        <td className="align-middle text-center"><Alert variant="warning" >Zgłoszenie oczekujące</Alert></td>
      </>)
  }

  const wRealizacji = (id) => {
    return (
      <>
        <td className="align-middle text-center"><Alert variant="primary" >Zgłoszenie w realizacji</Alert></td>
      </>
    )
  }

  const zakonczone = (id) => {
    return (
      <>
        <td className="align-middle text-center"><Alert variant="success">Zgłoszenie zakończone</Alert></td>
      </>
    )
  }

  return (
    <div>
      <Header tytul="Zgłoszenia" par="Poniżej znajdują się twoje zgłoszenia" />
      <div className="text-left" >
        <Button style={{ marginBottom: "5px" }} variant="secondary" onClick={handleOnClick}>Dodaj zgłoszenie</Button>
      </div>
      <Table responsive hover boarded>
        <thead className="thead-dark">
          <tr>
            <th className="text-center" scope="col">Lp.</th>
            <th className="text-center" scope="col">Opis</th>
            <th className="text-center" scope="col">Koszt całkowity</th>
            <th className="text-center" scope="col">Status</th>
            <th className="text-center" scope="col">Opcje</th>

          </tr>
        </thead>
        <tbody>{
          Zgloszenia.map(Zgloszenia => (
            <tr key={Zgloszenia.id}>
              <td className="align-middle">{Zgloszenia.id}</td>
              <td className="align-middle">{Zgloszenia.opis}</td>
              <td className="align-middle">{Zgloszenia.kosztCalkowity}</td>
              {
                (
                  (() => {
                    switch (Zgloszenia.statusZgloszenia.nazwa) {
                      case "oczekujace": return oczekujace(Zgloszenia.id)
                      case "przyjete": return przyjete(Zgloszenia.id);
                      case "w_realizacji": return wRealizacji(Zgloszenia.id);

                      default: return zakonczone(Zgloszenia.id);
                    }
                  })())
              }
              <td className="align-middle" >
                <Button variant="secondary" size="sm" onClick={() => btnPodglad(Zgloszenia.id)}>Podgląd</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <NoweZgloszenie show={dodajZgloszenie}
        onHide={() => { setDodajZgloszenie(false); setIdNajmuDodaj(null); setAktualizuj(true); }}
        idNajmu={idNajmuDodaj} />
      <PodgladZgloszenie show={podgladZgloszenie}
        onHide={() => { setPodgladZgloszenie(false); setIdZgloszenia(null); setAktualizuj(true); }}
        idZgloszenia={idZgloszenia} />
    </div>
  )
}

export default ListaZgloszen
