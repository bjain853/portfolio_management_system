package server.entity

import com.fasterxml.jackson.annotation.JsonManagedReference
import jakarta.persistence.*
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder


@Entity
@Table(name = "advisor")
class Advisor (

    @Column(nullable = false)
    var firstName: String,

    @Column(nullable = false)
    var lastName: String?,

    @Column(nullable = false)
    var address: String?,

    @Column(nullable = false)
    var phone: String?,

    @Column(name="email",nullable = false)
    private var username: String,

    @Column(name = "hashed_password")
    private var password:String,

    @OneToMany(mappedBy = "advisor",cascade = [CascadeType.ALL])
    @JsonManagedReference
    val clients: List<Client>,

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long
) : UserDetails {

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return mutableListOf(SimpleGrantedAuthority("Advisor"))

    }

    override fun getUsername(): String {
        return username
    }

    override fun getPassword(): String {
        return password
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }

}