package server.entity

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.type.SqlTypes
import java.util.*

@Entity
@Table(name = "client")
class Client(
    var firstName: String,
    var lastName: String,

    @ManyToOne
    @JoinColumn(name = "advisor_id")
    @JsonBackReference
    var advisor: Advisor,

    @OneToOne
    @JoinColumn(name = "portfolio_id")
    @JsonIgnore
    var portfolio: Portfolio?,
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    val id: UUID = UUID.randomUUID(),
)