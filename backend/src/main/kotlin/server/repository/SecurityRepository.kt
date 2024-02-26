package server.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import server.entity.Security

@Repository
interface SecurityRepository :JpaRepository<Security,Int>