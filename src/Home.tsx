import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useForm } from "react-hook-form";
import DropdownPicker from "./components/DropdownPicker";
import { cities } from "./helper";

const Home = () => {
  const openSheet = () => {
    bottomSheetModalRef.current?.present();
  };
  const closeSheet = () => {
    bottomSheetModalRef.current.close();
  };

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "70%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {}, []);

  const handleSheetChanges = useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
  }, []);

  const { control } = useForm({
    defaultValues: {
      cities: "",
    },
  });

  const citiesData = useMemo(() => {
    if (cities && cities.length) {
      return cities.map(({ name, id }) => ({ label: name || "", value: id }));
    } else {
      return [];
    }
  }, [cities]);

  const [loading, setLoading] = useState(false);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Text style={styles.header}>Home Screen</Text>

        <Pressable style={styles.button} onPress={openSheet}>
          <Text style={styles.buttonText}>Open Sheet</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={closeSheet}>
          <Text style={styles.buttonText}>Close Sheet</Text>
        </Pressable>

        <DropdownPicker
          items={citiesData}
          control={control}
          //   trigger={trigger}
          fieldName="cities"
          placeholder="Select city"
          disabled={false}
          label="City"
          refreshing={loading}
          searchAndFetchMoreItems={() => {
            console.log("Refresh");
            setLoading(true);

            setTimeout(() => {
              console.log("STOP Refrsh");

              setLoading(false);
            }, 5000);
          }}
          //   wrapperZindex={2}
        />

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={styles.sheetContainer}>
            <DropdownPicker
              items={citiesData}
              control={control}
              //   trigger={trigger}
              fieldName="cities"
              placeholder="Select city"
              disabled={false}
              label="City"
              //   wrapperZindex={2}
            />
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 30,
  },
  button: {
    backgroundColor: "#444",
    padding: 8,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "#FFF",
  },
  sheetContainer: {
    flex: 1,
    backgroundColor: "#7C73C0",
    width: "100%",
    paddingHorizontal: 12,
    paddingTop: 15,
  },
});
