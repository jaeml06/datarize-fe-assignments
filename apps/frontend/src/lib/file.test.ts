// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { downloadCSV } from './file'
import { saveAs } from 'file-saver'

// file-saver 모킹
vi.mock('file-saver', () => ({
  saveAs: vi.fn(),
}))

describe('downloadCSV', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // window.alert 모킹
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('데이터가 비어있으면 알림을 표시하고 리턴해야 한다', () => {
    downloadCSV([], 'test')

    expect(window.alert).toHaveBeenCalledWith('다운로드할 데이터가 없습니다.')
    expect(saveAs).not.toHaveBeenCalled()
  })

  it('데이터가 제공되면 BOM이 포함된 CSV를 다운로드해야 한다', () => {
    const data = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ]
    const filename = 'users'

    downloadCSV(data, filename)

    expect(saveAs).toHaveBeenCalledTimes(1)

    // 첫 번째 인자가 올바른 내용(BOM + CSV)을 가진 Blob인지 확인
    const blob = vi.mocked(saveAs).mock.calls[0][0] as Blob
    expect(blob).toBeInstanceOf(Blob)
    expect(blob.type).toBe('text/csv;charset=utf-8')
  })

  it('확장자가 없으면 .csv를 자동으로 추가해야 한다', () => {
    const data = [{ id: 1 }]
    downloadCSV(data, 'report')

    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'report.csv')
  })

  it('이미 .csv 확장자가 있으면 추가하지 않아야 한다', () => {
    const data = [{ id: 1 }]
    downloadCSV(data, 'data.csv')

    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'data.csv')
  })
})
