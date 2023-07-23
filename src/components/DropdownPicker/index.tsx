import React, { FC, memo, useCallback, useMemo, useRef, useState } from "react";
import DropDownPicker, {
  ItemType,
  ValueType,
} from "react-native-dropdown-picker";
import { Controller } from "react-hook-form";
import { RefreshControl, StyleSheet, Text, View } from "react-native";
import { debounce } from "lodash";

import type { DropDownPickerPropTypes, DropdownItemType } from "./types";

const DropdownPicker: FC<DropDownPickerPropTypes> = ({
  items,
  multiple = false,
  fieldName,
  control,
  disabled,
  label,
  isRequired = false,
  labelFont = "roboto",
  placeholder = "Select",
  searchable,
  disableLocalSearch = false,
  trigger,
  height = 47,
  onItemSelect,
  wrapperZindex = 1,
  searchPlaceholder = "Search ",
  searchAndFetchMoreItems,
  refreshing = false,
  dropdownHeight = 300,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const offset = useRef<number>(1);
  const initialRender = useRef(true);

  // Debouncing the search.
  const debouncedSearch = useMemo(
    () =>
      debounce((keyword: string) => {
        offset.current = 0;
        initialRender.current = true;
        searchAndFetchMoreItems && searchAndFetchMoreItems(keyword, 0);
      }, 800),
    []
  );

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field, fieldState }) => {
        const { value, onChange } = field;
        const { error } = fieldState;

        const handleSelectItem = useCallback((item: DropdownItemType) => {
          const { value } = item;

          if (value) {
            onChange(value);
          }
          onItemSelect && onItemSelect(fieldName, item);
        }, []);

        const setValue = useCallback(() => null, []);
        const keyExtractor = useCallback(
          (item: ItemType<ValueType>) => item.value,
          []
        );

        const onChangeSearchText = useCallback((text: string) => {
          debouncedSearch(text);
        }, []);

        const handleRefresh = useCallback(() => {
          searchAndFetchMoreItems &&
            searchAndFetchMoreItems("", offset.current * 10);
        }, []);

        const handleScrollBegin = () => {
          if (initialRender.current) {
            initialRender.current = false;
          }
        };

        const RefreshController = (
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        );

        const onEndReached = useCallback(() => {
          if (!initialRender.current && items.length) {
            searchAndFetchMoreItems &&
              searchAndFetchMoreItems("", offset.current);
            offset.current++;
          }
        }, [items]);

        return (
          <View style={{ zIndex: wrapperZindex }}>
            {label ? (
              <>
                <Text
                  style={{
                    color: "#FFF",
                    fontSize: 10,
                    lineHeight: 18,
                    marginBottom: 4,
                  }}
                >
                  {label}

                  {isRequired ? (
                    <Text
                      style={{
                        color: "red",
                        fontSize: 7,
                        lineHeight: 14,
                      }}
                    >
                      *
                    </Text>
                  ) : null}
                </Text>
              </>
            ) : null}

            <DropDownPicker
              open={open}
              value={value}
              items={items}
              placeholder={placeholder}
              searchable={searchable}
              disableLocalSearch={disableLocalSearch}
              setOpen={setOpen}
              setValue={setValue}
              onSelectItem={handleSelectItem}
              listMode="FLATLIST"
              multiple={multiple}
              disabled={disabled}
              flatListProps={{
                scrollEnabled: true,
                initialNumToRender: 10,
                windowSize: 10,
                keyExtractor,
                onEndReachedThreshold: 0.5,
                onMomentumScrollBegin: handleScrollBegin,
                onEndReached,
                refreshControl: RefreshController,
              }}
              searchPlaceholder={searchPlaceholder}
              searchTextInputProps={{
                autoCapitalize: "none",
              }}
              onChangeSearchText={onChangeSearchText}
              closeOnBackPressed={true}
              style={styles.main}
              minHeight={height}
              maxHeight={height}
              disabledStyle={styles.disabled}
              dropDownContainerStyle={{
                ...styles.dropDownContainer,
                maxHeight: dropdownHeight,
              }}
              textStyle={{
                color: disabled ? "#a3a3a3" : "#262626",
                ...styles.text,
              }}
              placeholderStyle={styles.placeholder}
              searchTextInputStyle={styles.searchTextInput}
              searchContainerStyle={styles.searchContainer}
              listItemLabelStyle={styles.listItemLabel}
              selectedItemLabelStyle={styles.selectedItemLabel}
              {...props}
            />

            {trigger ? (
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 10,
                  lineHeight: 18,
                  marginTop: 4,
                }}
              >
                {error ? error.message : "."}
              </Text>
            ) : null}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  main: {
    borderColor: "#d4d4d4",
    borderRadius: 4,
  },
  dropDownContainer: {
    backgroundColor: "white",
    borderColor: "#d4d4d4",
    borderRadius: 4,
    borderWidth: 1,
  },
  text: {
    fontSize: 14,
    paddingHorizontal: 3,
  },
  placeholder: {
    fontSize: 14,
    color: "#a3a3a3",
  },
  searchTextInput: {
    borderWidth: 0,
    borderRadius: 0,
  },
  searchContainer: {
    margin: 0,
    marginBottom: 8,
    padding: 0,
    paddingVertical: 4,
    borderBottomColor: "#d4d4d4",
  },
  listItemLabel: {
    paddingHorizontal: 6,
  },
  selectedItemLabel: {
    backgroundColor: "#d4d4d4",
    paddingVertical: 8,
  },
  disabled: {
    backgroundColor: "#f5f5f5",
  },
});

export default memo(DropdownPicker);
