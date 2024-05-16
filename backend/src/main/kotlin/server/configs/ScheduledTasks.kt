package server.configs

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.Resource
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service


@Service
class ScheduledTasks {

    @Value("classpath:stockPrices.py")
    var updateScript: Resource? = null

    @Value("classpath:sentimentAnalysis.py")
    var sentimentAnalysisScript: Resource? = null

    private val log: Logger = LoggerFactory.getLogger(ScheduledTasks::class.java)

    @Scheduled(cron = "* 43 8-10 * * *")
    fun updateStockPrices(){
        log.info("Started Updating Stock Prices using thread {}",Thread.currentThread().name)
//            val processBuilder: ProcessBuilder = ProcessBuilder(
//            "python",
//            updateScript?.filename ?: ""
//        )
//        log.info("Running file {}",updateScript?.filename)
//        processBuilder.redirectErrorStream(true)
//        val process: Process = processBuilder.start()
//        val exitCode: Int = process.waitFor()
//        assert(exitCode == 0)
        log.info("End Updating Stock Prices")
    }

    fun generateSentimentalAnalysisScores(){
        log.info("Started Updating Stock Prices")
        val processBuilder: ProcessBuilder = ProcessBuilder(
            "python",
            sentimentAnalysisScript?.filename ?: ""
        )
        log.info("Running file {}",sentimentAnalysisScript?.filename)
        processBuilder.redirectErrorStream(true)
        val process: Process = processBuilder.start()
        val exitCode: Int = process.waitFor()
        assert(exitCode == 0)
        log.info("End Updating Stock Prices")
    }

}