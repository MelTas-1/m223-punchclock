package ch.zli.m223.punchclock;

import ch.zli.m223.punchclock.domain.Entry;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.List;

public class jpqlTest {

    EntityManager em;

    public void test() {
        TypedQuery<Entry> query = em.createQuery("select checkIn from Entry", Entry.class );
        List<Entry> entries = query.getResultList();
    }
}
