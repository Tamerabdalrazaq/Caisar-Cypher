
/**
 * Write a description of CaesarBreaker here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
import edu.duke.*;
import java.util.Arrays;

public class CaesarBreaker {
    public void countLetters( String message, int [ ] counts) {
        // user needs to ensure counts is at least 26 long.. 
        Arrays.fill(counts,0);
        String alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for( char c : message.toCharArray() ){
            int pos = alpha.indexOf(Character.toString(Character.toUpperCase(c)) );
            if( pos > -1 ){
                counts[pos]++;
            }
        }
    }

    public int getKey( String cipher ) {
        WordLengths wl = new WordLengths();
        // find which letter in the message has highest frequency
        // assume that this is the transposition of e
        int [] counts = new int[26];
        countLetters( cipher, counts );
        int indOfTxposedE = 4 - wl.indexOfMax(counts);
        if (indOfTxposedE < 0 ){
            indOfTxposedE = 26 + indOfTxposedE;
        }
        return indOfTxposedE;
    }
    
    public String decrypt( String cipher ){
        CaesarCipher cc = new CaesarCipher();
        int indOfTxposedE = getKey( cipher );
        String message = cc.encrypt( cipher, indOfTxposedE );
        return message;
    }
    
    public String halfOfString( String message, int start){
        StringBuilder outS = new StringBuilder();
        int len = message.length();
        while( start < len ){
            outS.append(message.charAt(start));
            start += 2;
        }
        return outS.toString();
    }
    
    public String decryptTwoKeys( String encrypted ){
        String first = halfOfString( encrypted, 0 );
        String second = halfOfString( encrypted, 1 );
        int key1 = getKey( first );
        int key2 = getKey( second );
        System.out.println("Keys : " + key1 + "," + key2 );
        CaesarCipher cc = new CaesarCipher();
        String message = cc.encryptTwoKeys( encrypted, key1, key2 );
        return message;
        
    }
    
    public void testCountLetters() {
        WordLengths wl = new WordLengths();
        int [] counts = new int[26];
        //FileResource resource = new FileResource( "smallHamlet.txt");
        FileResource resource = new FileResource( "hamlet.txt");
        countLetters( resource.asString(), counts );
        for( int k=0; k<counts.length; k++ ){
            System.out.println( "letter index " + k + ": " + counts[k] );
        }
        
        System.out.println("Most common word length : " + wl.indexOfMax(counts));
    }
    
    public void testDecrypt(){
        FileResource resource = new FileResource( "cipher.txt");
        String message = decrypt( resource.asString() );        
        System.out.println(message);
        
    }
    
    public void testHalfOfString(){
        String test1 = "abababababababa";
        System.out.println("Testing getHalf with " + test1 + ",0: " + halfOfString(test1,0));
        System.out.println("Testing getHalf with " + test1 + ",1: " + halfOfString(test1,1));
        
    }
    
    public void testDecryptTwoKeys() {
        FileResource resource = new FileResource( "mysteryTwoKeysPractice.txt"); // cipher2key.txt
        String message = decryptTwoKeys( resource.asString() );        
        System.out.println(message);
        
        System.out.println("testing decryptTwoKeys with 'Akag tjw Xibhr awoa aoee xakex znxag xwko'");
        System.out.println(decryptTwoKeys("Akag tjw Xibhr awoa aoee xakex znxag xwko"));
        
    }
}
