/**
 * ISO 8601 날짜 문자열
 * 예: "2023-01-01"
 *
 * Template Literal Type을 사용하여 기본적인 형식을 강제합니다.
 */
type YYYY = `${number}${number}${number}${number}`
type MM = `${number}${number}`
type DD = `${number}${number}`

export type ISODate = `${YYYY}-${MM}-${DD}`
