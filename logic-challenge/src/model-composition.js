exports.modelComposition = function (models, period) {
  const compositions = []
  const { addDays } = require('date-fns');

  const { startDate, endDate } = period

  let currentStartDate = startDate
  let currentEndDate = endDate

  for (const modelName in models) {
    const [modelStartOffset, modelEndOffset] = models[modelName].split(':')

    const modelStartDate = addDays(currentStartDate, Number(modelStartOffset))
    const modelEndDate = addDays(currentStartDate, Number(modelEndOffset))

    if (modelEndDate > currentEndDate) {
      currentEndDate = modelEndDate
    }

    compositions.push({
      model: modelName,
      period: {
        startDate: modelStartDate,
        endDate: modelEndDate,
      },
    })

    currentStartDate = addDays(modelEndDate, 1)
  }

  return compositions
}
