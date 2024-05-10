package server.controller

import org.springframework.web.bind.annotation.*
import server.DTO.TransactionDTO
import server.entity.Security
import server.entity.SecurityCategory
import server.service.SecurityService
import server.service.TransactionService
import java.util.*


@RestController
@RequestMapping("/api/security")
class SecurityController(
    private val securityService: SecurityService,
    private val transactionService: TransactionService
) {

    @GetMapping("/categories")
    fun getSecurityCategories(): List<SecurityCategory> = SecurityCategory.entries.toList()

    @GetMapping("/{id}")
    fun getSecurityById(@PathVariable("id") id: UUID): Security? = securityService.getSecurityById(id)

    @GetMapping("/{category}/names")
    fun getSecurityNamesForCategory(@PathVariable("category") category: SecurityCategory): List<String> =
        securityService.getSecurityNamesByCategory(category)

    @GetMapping("/{name}/latest-price")
    fun getLatestSecurityPriceByName(@PathVariable("name") name: String): Number =
        securityService.getLatestSecurityPriceByName(name)

    // TODO: Total Return
    // TODO: Sharpe Ratio
    // TODO: R-Squared


    @PatchMapping
    fun updateSecurity(): TransactionDTO? {
        // TODO : implement
        return null
    }

}