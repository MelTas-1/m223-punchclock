package ch.zli.m223.punchclock.controller;

import ch.zli.m223.punchclock.domain.ApplicationUser;
import ch.zli.m223.punchclock.repository.ApplicationUserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private ApplicationUserRepository  userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserController(ApplicationUserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder){
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    // Das erstellen eines Benutzers
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void singUp(@RequestBody ApplicationUser user){
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    //Zurückgeben aller Benutzer
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
   public List<ApplicationUser> getAllUsers() {return userRepository.findAll();}


   // Zurückgeben eines Benutzers anhand des Benutzernamen

    @GetMapping("/{username}")
    @ResponseStatus(HttpStatus.OK)
   public ApplicationUser getUser(@PathVariable String username) {return userRepository.findByUsername(username);}

   //Ändern eines vorhanden Nutzers und anschliessende Ausgabe des Eintrags
    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public ApplicationUser updateUser(@Valid @RequestBody ApplicationUser user){
        return userRepository.saveAndFlush(user);
    }

    //Löschen eines vorhanden Nutzer anhand seiner ID
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id){
        try{
            userRepository.deleteById(id);
        } catch (Exception e){
            System.out.println("error");
        }
    }
}
