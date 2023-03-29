
/**
 * Write a description of CaesarCipher here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
import edu.duke.*;

public class CaesarCipher {
    
    public String encrypt( String input, int key ){
        String ab = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String code = ab.substring(key) + ab.substring(0,key);
        StringBuilder cipher = new StringBuilder();
        for( char c : input.toCharArray() ){
            int pos = ab.indexOf(Character.toString(Character.toUpperCase(c)) );
            if( -1 == pos ){ // not in the alphabet (yes, standard Java method possible..
                cipher.append( c );
            } else {
                if( Character.isUpperCase(c) ){
                    cipher.append( code.charAt(pos) );
                } else {
                    cipher.append( Character.toLowerCase(code.charAt(pos)) );
                }
            }
            pos++;
        }
        return cipher.toString();
    }

    public String encryptTwoKeys ( String input, int key1, int key2 ){
        String ab = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String code1 = ab.substring(key1) + ab.substring(0,key1);
        String code2 = ab.substring(key2) + ab.substring(0,key2);
        StringBuilder cipher = new StringBuilder();
        int location = 1;
        for( char c : input.toCharArray() ){
            int pos = ab.indexOf(Character.toString(Character.toUpperCase(c)) );
            if( -1 == pos ){ // not in the alphabet (yes, standard Java method possible..
                cipher.append( c );
            } else {
                String code = (1 == location % 2 )?code1:code2;
                if( Character.isUpperCase(c) ){
                    cipher.append( code.charAt(pos) );
                } else {
                    cipher.append( Character.toLowerCase(code.charAt(pos)) );
                }
            }
            pos++;
            location++;
        }
        return cipher.toString();
        
    }
    
    
    public void testCaesar(){
        System.out.println("Testing CaesarCipher with 'FIRST LEGION ATTACK EAST FLANK!',23: ");
        System.out.println(encrypt("FIRST LEGION ATTACK EAST FLANK!", 23) );
        
        System.out.println("Testing CaesarCipher with 'First Legion',17: ");
        System.out.println(encrypt("First Legion", 17) );
        
        System.out.println("Testing encrypt with 'At noon be in the conference room with your hat on for a surprise party. YELL LOUD!',15");
        System.out.println(encrypt("At noon be in the conference room with your hat on for a surprise party. YELL LOUD!",15) );

        System.out.println("Testing encrypt with 'Pi cddc qt xc iwt rdcutgtcrt gddb lxiw ndjg wpi dc udg p hjgegxht epgin. NTAA ADJS!',15");
        System.out.println(encrypt("Pi cddc qt xc iwt rdcutgtcrt gddb lxiw ndjg wpi dc udg p hjgegxht epgin. NTAA ADJS!",11) );

    }


    public void testEncryptTwoKeys(){
        System.out.println("Testing encryptTwoKeys with 'First Legion',23,17: ");
        System.out.println(encryptTwoKeys("First Legion",23, 17) );
        
        System.out.println("Testing encryptTwoKeys with 'At noon be in the conference room with your hat on for a surprise party. YELL LOUD!',8,21: ");
        System.out.println(encryptTwoKeys("At noon be in the conference room with your hat on for a surprise party. YELL LOUD!",8,21) );
        FileResource resource = new FileResource( "gettysberg.txt");
        String cipher = encryptTwoKeys( resource.asString(), 12, 8 );        
        System.out.println(cipher);
        
        System.out.println("Testing encryptTwoKeys with 'Top ncmy qkff vi vguv vbg ycpx', 24, 6");
        System.out.println(encryptTwoKeys( "Top ncmy qkff vi vguv vbg ycpx", 24, 6 ));
    }
    
    public void decrypt(){
        for( int k=0; k < 26; k++ ){
            System.out.println(encrypt("Lujyfwapvu huk zljbypaf hyl mbukhtluahs whyaz vm avkhf'z Pualyula.",k) );
            // Ans : 19
        }
    }
}
