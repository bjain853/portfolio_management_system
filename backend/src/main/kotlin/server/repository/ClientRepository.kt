package server.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import server.entity.Client
import java.util.*

@Repository
interface ClientRepository : JpaRepository<Client, UUID> {

    fun findByFirstNameAndLastName(firstName: String, lastName: String): Client?
    
}

