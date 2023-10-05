import {StyleSheet, Text, View, Pressable } from 'react-native';
import { useEffect, useState } from 'react';

const RoundedButton = ({text, color, onPress}) => {
  return <>
    <Pressable style={({pressed}) => [styles.button, {backgroundColor: color }, {opacity: pressed ? 0.5 : undefined}]} onPress = {onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  </>
};

export default function App() {

  const [running, setRunning] = useState(false)
  const [elapsedSeconds, setElapsedSecs] = useState(0)

  useEffect(() => {
    let intervalId = null
    if (running) {
      intervalId = setInterval(() => setElapsedSecs((elapsedSeconds) => elapsedSeconds + 1), 1000)
    }

    // Clear up function
    return () => {
      clearInterval(intervalId);
    };
  }, [running])

  const formatTime = (seconds) => {
    const mins = `${Math.floor(seconds/60)}`.padStart(2, "0")
    const secs = `${seconds % 60}`.padStart(2, "0")
    return `${mins}:${secs}`

  }
  return (
    <View style={styles.container}>
      <Text style={styles.elapsedTimeText}>{formatTime(elapsedSeconds)}</Text>
      <View style={styles.buttonContainer}>

        <RoundedButton
          text={"Reset"}
          color={"red"}
          onPress={() => {
            setRunning(false)
            setElapsedSecs(0)
          }}
        />
        {running ? (
          <RoundedButton
            text={"Stop"}
            color={"pink"}
            onPress={() => setRunning(false)}
          />
        ) : (
          <RoundedButton
            text={"Start"}
            color={"green"}
            onPress={() => setRunning(true)}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  elapsedTimeText: {
    color: 'white',
    fontSize: 100,
    fontWeight: "200"
  },
  button: {
    opacity: 0.8,
    borderRadius: 50,
    borderColor: "blue",
    borderWidth: 2,
    width: 80,
    height: 80,
    justifyContent: 'center',
    margin: 50,
  },
  buttonText: {
    color: 'white', 
    fontSize: 20,
    textAlign: 'center',
    userSelect: 'none'
  },
});
