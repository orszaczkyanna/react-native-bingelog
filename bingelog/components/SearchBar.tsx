import React, { useState } from "react";
import { usePathname, useRouter } from "expo-router";
import { View, TextInput, Pressable, TextInputProps } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Colors from "@/constants/Colors";

interface Props extends TextInputProps {
  initialQuery?: string; // for pre-filling the search bar when returning to the screen or updating query from route
}

const SearchBar = ({ initialQuery, ...rest }: Props) => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path where the SearchBar is used

  const [query, setQuery] = useState(initialQuery || "");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    // If the query is empty, do nothing
    if (!trimmedQuery) return;

    // If we are already on the search page, update the query parameter
    if (pathname.startsWith("/search")) {
      router.setParams({ query: trimmedQuery });
    }
    // If we are not on the search page, navigate to the search page with the query
    else {
      // Note: Use object syntax in router.push to ensure type safety
      router.push({
        pathname: "/search/[query]",
        params: { query: trimmedQuery },
      });
    }
  };

  return (
    <View
      className={`w-[90vw] h-12 flex flex-row items-center bg-background-input rounded-md mt-4 px-4 border-2  ${
        isFocused ? "border-accent" : "border-background-input"
      } `}
    >
      <TextInput
        value={query}
        onChangeText={setQuery}
        className="text-foreground font-nunitoRegular text-base flex-1"
        placeholderTextColor={Colors.foreground.muted}
        selectionColor={Colors.foreground.muted}
        cursorColor={Colors.accent}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={handleSearch} // Triggers search when user presses the Enter/Return key
        {...rest} // placeholder, etc.
      />

      <Pressable onPress={handleSearch}>
        <Feather
          name={"search"}
          size={18}
          color={Colors.foreground.secondary}
        />
      </Pressable>
    </View>
  );
};

export default SearchBar;
