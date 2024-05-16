package server.entity

import com.fasterxml.jackson.annotation.JsonManagedReference
import jakarta.persistence.*
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.type.SqlTypes
import java.time.LocalDateTime
import java.util.*

@Entity
@Table(name = "portfolio")
class Portfolio(

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creationTimeStamp")
    var clientEnrollmentDate: LocalDateTime = LocalDateTime.now(),

    @OneToOne
    @JoinColumn(name = "client_id")
    var client: Client?, // nullable since portfolio can be on its own but client shouldn't be without a portfolio

    @OneToMany(mappedBy = "portfolio")
    @JsonManagedReference
    var transactions: List<Transaction>? = null,

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    var id: UUID = UUID.randomUUID(),
)