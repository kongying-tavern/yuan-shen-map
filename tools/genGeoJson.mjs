//// @ts-ignore
import JS_array from './data.mjs'

import process from 'process'
const url = process.argv[2]

import fs from 'fs-extra'
const writeTempStream = async (fileName, data) => {
  try {
    const tmpDir = await makeTempDir()
    const filePath = `${tmpDir}${path.sep}${fileName}`
    consoleInfo('write temp file.')
    const wStream = fs.createWriteStream(filePath)
    wStream.write(data, 'utf8')
    consoleInfo('write temp file succeed.')
    return filePath
  } catch (err) {
    console.error(err)
  }
}

import os from 'os'
import path from 'path'
const makeTempDir = async () => {
  try {
    consoleInfo('make temp dir.')
    return await fs.mkdtemp(`${os.tmpdir()}${path.sep}`)
  } catch (err) {
    console.error(err)
  }
}

const consoleInfo = (string) => {
  console.log(`${string}================================================`)
}

const copyFiles = async (src, dest) => {
  try {
    consoleInfo('start copy file.')
    await fs.copy(src, dest)
    consoleInfo('copy succeed.')
  } catch (err) {
    console.error(err)
  }
}

const genGeoJson = async (res) => {
  consoleInfo('start gen geojson file.')
  for await (const item of res.data.list) {
    var markerX = item.xy.split(',')[0]
    var markerY = item.xy.split(',')[1]
    var markerInfo = {
      geometry: {
        type: 'Point',
        coordinates: [markerX, markerY],
      },
      type: 'Feature',
      properties: {
        popTitle: item.popTitle,
        popupContent: item.popupContent,
      },
      id: item.id,
    }
    JS_array[item.layerId].features.push(markerInfo)
  }
  consoleInfo('gen geojson file succeed.')
}

import fetch from 'node-fetch'
const fetchData = async () => {
  consoleInfo('fetch data.')
  const rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  consoleInfo('fetch end.')
  if (!rawResponse.ok) {
    throw new Error(`HTTP error! status: ${rawResponse.status}`)
  } else {
    return await rawResponse.json()
  }
}

;(async () => {
  const content = await fetchData().then(async (res) => {
    await genGeoJson(res)
    return JSON.stringify(JS_array)
  })
  const tmpFilePath = await writeTempStream(
    'marker.js',
    `var originJsonArr =${content};\nfor (var i = 0; i < originJsonArr.length; i++) { JS_array[i].features = originJsonArr[i].features; }\n// ${Date()}\n`
  )
  await copyFiles(tmpFilePath, './Item_Features.js')
})()
