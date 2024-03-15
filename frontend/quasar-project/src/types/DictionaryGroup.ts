export interface DictionaryGroupDto {
  _id: string;
  group_id: string;
  name: string;
}

export interface DictionaryDto {
    _id: string;
    dictionary_group_id: string;
    eng_word: string;
    ru_word: string;
    description_word: string;
}
