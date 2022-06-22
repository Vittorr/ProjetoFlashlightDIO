import React, {useState, useEffect} from "react";
import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
// import imagex from './assets/icons/eco-light-off.png' -------> um jeito de importar
import Torch from "react-native-torch";
import RNShake from 'react-native-shake';


const App = () => {

  // const toggle = false; // true or false
  const [toggle, setToggle] = useState(false);

  // boa prática criar a função de callback fora pois dentro nao sabemos seu contexto!
  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  // useEffect(() => {

  //   // liga flash do celular

  //   // return () => Alert.alert('Desmontou o componente')
  //   Alert.alert('Atualizou o componente ' + toggle);
  // }, [toggle]);

  useEffect(() => {
    // liga flash do celular
    Torch.switchState(toggle);
  }, [toggle]);


  // Effect para checar se o celular está chachoalhando para ligar o flash do celular!
  // Quando o celular for chacoalhado mudaremos o toggle
  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      // handleChangeToggle(); --> dessa forma teria que ter outro callback e outros hooks...
      setToggle(oldToggle => !oldToggle);
    });

    // Essa função vai ser chamada quando o componente for ser desmontado
    return () => subscription.remove();

  }, []);


  // if toggle returns light
  return <View style={toggle ? style.containerLight : style.container} >
    {/* <TouchableOpacity onPress={() => {setToggle((oldToggle) => { return !oldToggle; })}}> */}
    {/* <TouchableOpacity onPress={() => {setToggle(oldToggle => !oldToggle)}}> */}
    <TouchableOpacity onPress={handleChangeToggle}>

      <Image style={toggle ? style.lightingOn : style.lightingOff}

      // source={imagex}
        source={toggle ? require('./assets/icons/eco-light.png') : require('./assets/icons/eco-light-off.png')}
      />

     <Image style={style.dioLogo}

      // source={imagex}
        source={toggle ? require('./assets/icons/logo-dio.png') : require('./assets/icons/logo-dio-white.png')}
     />

    </TouchableOpacity>

  </View>;
};

export default App

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },

  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },

  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },

});


// o react só atualiza o estado da variavel mudando seu valor... --> ai que entra o useState
// usamos o useState que nos gera uma array com um valor e uma função que altera seu valor...
// --> podemos manter seu primeiro valor como uma constante que é true ou false ...
// ----> na hora de alterá-la chamamos a função passando um callback em que temos oldToggle (o valor antigo) -> virando !oldToggle (o inverso dele)
// --> assim poedmos ficar trocando entre true e false toda hora

// useEffect ---> para checar os efeitos e estados atuais (ex: montar e desmontar componente)
// --> podemos usar para enviar mensagens na tela (ex: Alert.alert)


// OBS: toda vez que o toggle mudar na função ele vai entrar no useEffect e vai atualizar o estado da nossa lanterna


// OBS: podemos ter mais de um userEffect por tela!

// --> aprendemos o ciclo de vida de desde criar até desmontar o componente!!



// OBS: poderiamos importar o useCallback na função... --> pesquisar depois sobre
