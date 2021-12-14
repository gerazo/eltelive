const osu = require('node-os-utils')

async function getCPUInfo(){

    const cpu = osu.cpu

  const info = await cpu.usage()

    return Math.trunc(info)

}
async function percentageMemory(){

    const mem = osu.mem

   const info = await mem.info()

    return {'freeMem':Math.trunc(info.freeMemPercentage),'usedMem':Math.trunc(info.usedMemPercentage)}
}
module.exports = {
    getCPUInfo,
    percentageMemory,

}
