import { useState } from "react";
import * as S from "./styles";

export type Props = {
  suggestions: any[];
  placeholder: string;
  onOptionChanged?: (value: any) => void;
};

function InputAutoComplete({
  suggestions,
  placeholder,
  onOptionChanged,
}: Props): JSX.Element {
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");

  const maxInputsShowing = 4;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    const relatedSuggestions = suggestions
      ? suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(userInput.toLowerCase()),
        )
      : [];

    setInput(e.target.value);
    setFilteredSuggestions(relatedSuggestions);
    setShowSuggestions(true);
  };

  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const handleOptionClick = (value: string) => {
    setInput(value);
    setShowSuggestions(false);
    if (onOptionChanged) onOptionChanged(value);
  };

  return (
    <>
      <S.Input
        name={placeholder}
        onChange={onChange}
        onClick={onClick}
        value={input}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      {showSuggestions && input && (
        <S.Container>
          {filteredSuggestions.map(
            (value, index) =>
              index < maxInputsShowing && (
                <S.OptionContainer
                  onClick={() => handleOptionClick(value)}
                  key={value}
                >
                  <S.OptionText>{value}</S.OptionText>
                </S.OptionContainer>
              ),
          )}
        </S.Container>
      )}
    </>
  );
}

export default InputAutoComplete;
