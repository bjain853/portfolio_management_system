package server.entity

import com.fasterxml.jackson.annotation.JsonManagedReference
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "portfolio")
class Portfolio(

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creationTimeStamp")
    var clientEnrollmentDate: LocalDateTime,

    @OneToOne
    @JoinColumn(name = "client_id")
    var client:Client,

    @OneToMany(mappedBy = "portfolio")
    @JsonManagedReference
    var securities: List<Security>,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long
)